const theme = {
  background: '#D5ECF3',
  mainColor: '#78B1E6',
  boxColor: '#F0F5F7',
  borderColor: '#aaa',
  fontColor: '#333',
  placeholderColor: '#c2c2c2',
  flexMixin: (direction = 'row', align = 'center', justify = 'center') => `
  display:flex;
  flex-direction:${direction};
  align-items:${align};
  justify-content:${justify};
  `,
  fontTitle: "'Alata', sans-serif;",
  fontContent: "'Noto Sans KR', sans-serif;",
};

export default theme;
