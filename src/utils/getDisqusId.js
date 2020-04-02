export default post => {
  let disqusID = typeof window !== `undefined` && window.getDisqusId;

  if (!disqusID) {
    disqusID =
      post.codeinjection_head &&
      post.codeinjection_head.includes(`window.disqusID =`) &&
      post.codeinjection_head.replace(/\D/g, ``);
  }

  return disqusID || post.slug;
};
