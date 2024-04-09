import { create } from 'zustand';

interface WritePageStoreStoreProps {
  gender: string; // 성별
  age: string[]; // 연령
  researchType: string[]; // 리서치 종류
  procedure: string; // 진행 방식
  enddate: Date | string; // 마감일
  link: string; // 링크
  time: string; // 소요 시간
  content: string; // 본문
  title: string; // 제목
  setAge: (age: string) => void;
  setAges: (ages: string[]) => void;
  setGender: (gender: string) => void;
  setResearchType: (type: string) => void;
  setResearchTypes: (types: string[]) => void;
  setprocedureArray: (type: string) => void;
  setLink: (link: string) => void;
  setTime: (time: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setEnddate: (title: Date) => void;
  toggleAge: (age: string[]) => void;
}

// Selects 객체를 위한 타입을 별도로 정의합니다.
export interface Selects {
  sort?: string;
  gender?: string;
  age?: string;
  research_type?: string;
  procedure?: string;
  [key: string]: string | undefined; // 인덱스 서명을 추가합니다.
}

export interface MainPageStoreProps {
  searchText: string;
  currentPage: number;
  totalPage: number;
  selects: Selects;
  setSearchText: (searchText: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPage: (totalPage: number) => void;
  setSelects: (selectsObj: Selects) => void;
}

interface LoginPageStorePros {
  nickname: string | undefined; // 닉네임
  phone: undefined;
  gender: string;
  advertisingConsent: boolean; // 광고수신 여부
  birthDate: string;
  job: string;
  setNickName: (nickNameValue: string) => void;
  setPhoe: (phoneValue: undefined) => void;
  setGender: (contentvalue: string) => void;
  setAdvertisingConsent: (advertisingConsentValue: boolean) => void;
  setbirthDate: (setbirthDateValue: string) => void;
  setJob: (jobVale: string) => void;
}

export const WritePageStore = create<WritePageStoreStoreProps>((set) => ({
  gender: '',
  age: [],
  researchType: [],
  procedure: '',
  enddate: new Date(),
  link: '',
  time: '',
  title: '',
  content: ' ',
  setAge: (newAge) =>
    set((state) => {
      const updatedAge = state.age.includes(newAge)
        ? state.age
        : [newAge, ...state.age];
      updatedAge.sort(); // 값 정렬
      return { age: updatedAge };
    }),
  toggleAge: (newAges) =>
    set((state) => {
      const updatedAge = state.age.filter((age) => newAges.includes(age));
      updatedAge.sort(); // 값 정렬
      return { age: updatedAge };
    }),
  setGender: (genderValue) => set({ gender: genderValue }),
  // setResearchType: (type) => set({ researchType: type })
  setResearchType: (newType) =>
    set((state) => ({
      researchType: state.researchType.includes(newType)
        ? state.researchType
        : [newType, ...state.researchType],
    })),
  setprocedureArray: (method) => set({ procedure: method }),
  setLink: (linkValue) => set({ link: linkValue }),
  setTime: (timeValue) => set({ time: timeValue }),
  setTitle: (titleValue) => set({ title: titleValue }),
  setAges: (agesValue) => set({ age: agesValue }),
  setResearchTypes: (typeValue) => set({ researchType: typeValue }),
  setContent: (contentvalue) => set({ content: contentvalue }),
  setEnddate: (dateValue) => set({ enddate: dateValue }),
}));

export const MainPageStore = create<MainPageStoreProps>((set) => ({
  searchText: '',
  currentPage: 1,
  totalPage: 1,
  selects: {},
  setSearchText: (searchTextValue) => set({ searchText: searchTextValue }),
  setCurrentPage: (pageValue) => set({ currentPage: pageValue }),
  setTotalPage: (totalPageValue) => set({ totalPage: totalPageValue }),
  setSelects: (
    selectsObj: Partial<{
      sort: string;
      gender: string;
      age: string;
      research_type: string;
      procedure: string;
    }>
  ) =>
    set((prev) => ({
      selects: {
        ...prev.selects,
        ...selectsObj,
      },
    })),
}));

export const useUserInfoStore = create<LoginPageStorePros>()((set) => ({
  nickname: undefined,
  phone: undefined,
  gender: '',
  advertisingConsent: false,
  birthDate: '',
  job: '',
  setNickName: (nickNameValue) => set({ nickname: nickNameValue }),
  setPhoe: (phoneValue) => set({ phone: phoneValue }),
  setGender: (contentvalue) => set({ gender: contentvalue }),
  setAdvertisingConsent: (advertisingConsentValue) =>
    set({ advertisingConsent: advertisingConsentValue }),
  setbirthDate: (birthDateValue) => set({ birthDate: birthDateValue }),
  setJob: (jobValue) => set({ job: jobValue }),
}));

interface SuccessodalStoreProps {
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
  setCloseModal: (open: boolean) => void;
}

export const SuccessModalStore = create<SuccessodalStoreProps>((set) => ({
  isSuccessModalOpen: false,
  setIsSuccessModalOpen: (open) => set({ isSuccessModalOpen: open }),
  setCloseModal: () => set({ isSuccessModalOpen: false }),
}));
