export async function storefrontApiFetch(
  query: string,
  variables: Record<string, string | number>,
): Promise<Record<any, any>> {
  const payload = JSON.stringify({ query, variables });
  console.log(payload);

  const request = await fetch(`https://${window.Shopify.shop}/api/2024-07/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': '1b350c58e111b2c6127f6452df16dd6f',
    },
    body: JSON.stringify({ query, variables }),
  });
  const response = await request.json();

  return response;
}
