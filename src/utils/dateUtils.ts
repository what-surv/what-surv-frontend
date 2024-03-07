export const formatDateString = (originalDateString: string): string => {
  const originalDate = new Date(originalDateString);
  const formattedDate = `${originalDate.getFullYear()}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getDate().toString().padStart(2, '0')}`;
  return formattedDate;
};

export const convertToYYYYMMDD = (yyMMDD: string) => {
  console.log(yyMMDD);

  // 정규 표현식을 사용하여 날짜에서 년, 월, 일을 추출
  const match = yyMMDD.match(/^(\d{2})(\d{2})(\d{2})$/);
  if (!match) {
    // 잘못된 형식의 입력에 대한 처리
    return 'Invalid input format';
  }

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);

  // 년도에 따라 구분
  let fullYear: number;

  if (year >= 0 && year <= 21) {
    // 2000년 이후 출생자인 경우
    fullYear = 2000 + year;
  } else if (year >= 22 && year <= 99) {
    // 1900년 이후 출생자인 경우
    fullYear = 1900 + year;
  } else {
    // 그 외의 경우는 잘못된 형식으로 처리
    return 'Invalid year';
  }

  // 날짜를 yyyymmdd 형식으로 조합
  const formattedDate = `${fullYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return formattedDate;
};
