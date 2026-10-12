import { cache } from "react";

const DEFAULT_REVALIDATE_SECONDS = 300;

function getRevalidateSeconds() {
  const value = Number.parseInt(process.env.REVALIDATE_TIME ?? "", 10);
  return Number.isInteger(value) && value > 0
    ? value
    : DEFAULT_REVALIDATE_SECONDS;
}

const executeWordPressQuery = cache(async (query, variables = {}) => {
  const endpoint = process.env.NEXT_PUBLIC_WP_GRAPHQL;

  if (!endpoint) {
    throw new Error("La variable NEXT_PUBLIC_WP_GRAPHQL n’est pas configurée.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    cache: "force-cache",
    next: { revalidate: getRevalidateSeconds() },
  });

  if (!response.ok) {
    throw new Error(`La requête WordPress a échoué (HTTP ${response.status}).`);
  }

  const payload = await response.json();

  if (payload.errors?.length) {
    const messages = payload.errors.map(({ message }) => message).join("; ");
    throw new Error(`Erreur GraphQL WordPress : ${messages}`);
  }

  if (!payload.data) {
    throw new Error("La réponse GraphQL WordPress ne contient pas de données.");
  }

  return payload.data;
});

const PAGE_FIELDS = `
  databaseId
  title
  content(format: RENDERED)
  seo {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl }
  }
`;

const POST_FIELDS = `
  databaseId
  title
  slug
  date
  excerpt
  content(format: RENDERED)
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails { width height }
    }
  }
  categories { nodes { name slug } }
  seo {
    title
    metaDesc
    canonical
    metaRobotsNoindex
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl }
  }
`;

export async function getHomepage() {
  const data = await executeWordPressQuery(`
    query GetHomepage {
      page(id: "accueil", idType: URI) {
        ${PAGE_FIELDS}
      }
    }
  `);

  return data.page;
}

export async function getWordPressPages() {
  const data = await executeWordPressQuery(`
    query GetWordPressPages {
      pages(first: 100, where: { status: PUBLISH }) {
        nodes { title slug uri }
      }
    }
  `);

  return data.pages?.nodes ?? [];
}

export async function getWordPressPage(uri) {
  const data = await executeWordPressQuery(
    `
      query GetWordPressPage($uri: ID!) {
        page(id: $uri, idType: URI) {
          ${PAGE_FIELDS}
        }
      }
    `,
    { uri },
  );

  return data.page;
}

export async function getAdviceArticles() {
  const data = await executeWordPressQuery(`
    query GetAdviceArticles {
      posts(first: 100, where: { categoryName: "conseils", orderby: { field: DATE, order: DESC } }) {
        nodes {
          databaseId
          title
          slug
          uri
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
      }
    }
  `);

  return data.posts?.nodes ?? [];
}

export async function getAdviceArticle(slug) {
  const data = await executeWordPressQuery(
    `
      query GetAdviceArticle($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          ${POST_FIELDS}
        }
      }
    `,
    { slug },
  );

  const post = data.post;
  const isAdviceArticle = post?.categories?.nodes?.some(
    (category) => category.slug === "conseils",
  );

  return isAdviceArticle ? post : null;
}
