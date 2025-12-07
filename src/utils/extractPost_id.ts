const extractPost_id = (pathname: string) => {
  const segments = pathname.split("/"); 
  const index = segments.indexOf("posts");
  const post_id = segments[index + 1];

  return post_id;
};

export { extractPost_id };