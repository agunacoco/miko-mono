export const createSearchParams = (input: string) => {
  if (input === '') return '';

  let result = '&search=';
  input.split(' ').forEach((word, idx) => {
    result += word + '*';
  });

  return result;
};
