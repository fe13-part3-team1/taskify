export const separateTagColor = (tagList: string[]) => {
  return tagList.map((tag) => {
    const [text, color] = tag.split('#');
    return { text, color };
  });
};
