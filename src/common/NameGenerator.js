const prefix = [
    '화가 잔뜩난',
    '어쩔',
    '저쩔',
    '아가',
    '응애',
    '잘 안 씻는',
    '냄새 나는',
    '울보',
    '대머리',
    '민머리',
    '탈모',
    '속 좁은',
    '소인배',
    '눈치 없는',
    '배고픈',
    '불면증',
    '아픈',
    '까불이',
    '재롱둥이',
    '이상한',
    '거대한',
    '아주 작은',
    '양념',
    '간장',
    '구운',
    '볶은',
    '튀긴',
    '슬픈',
    '우는',
    '불친절한',
    '죽은',
    '해골',
    '폭주족',
    '포악한',
    '흉악한',
    '미운',
    '연못',
    '후라이드',
    '뿌링클',
    '치즈맛',
]
const names = [
    '고래',
    '오징어',
    '꽃게',
    '물개',
    '바다사자',
    '팽귄',
    '해달',
    '문어',
    '상어',
    '불가사리',
    '곰치',
    '미역',
    '해삼',
    '멍개',
    '말미잘',
    '망둥어',
    '아귀',
    '장어',
    '아저씨',
    '해파리',
    '복어',
    '송사리',
    '쭈꾸미',
    '낙지',
    '돌고래',
    '새우',
    '대하',
    '광어',
    '우럭',
    '옥돔',
    '빙어',
    '참치',
    '참치마요',
    '가재',
    '바다뱀',
    '거북이',
    '꼬부기',
    '집게사장',
    '스폰지밥',
    '뚱이',
    '징징이',
    '보노보노',
    '오리',
    '거위',
    '오리너구리',
    '갈치'
]
export const generateName = () => {
    let name = '';
    name += prefix[Math.floor((Math.random() * prefix.length))];
    name += ' ';
    name += names[Math.floor((Math.random() * names.length))];
    return name;
}