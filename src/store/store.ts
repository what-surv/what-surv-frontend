import { create } from 'zustand';

interface WritePageStoreStoreProps {
  gender: string; // 성별
  age: string[]; // 연령
  researchType: string; // 리서치 종류
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
  setprocedureArray: (type: string) => void;
  setLink: (link: string) => void;
  setTime: (time: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setEnddate: (title: Date) => void;
  toggleAge: (age: string[]) => void;
}

export interface MainPageStoreProps {
  searchText: string;
  currentPage: number;
  totalPage: number;
  selects: {
    sort?: string | undefined;
    gender?: string | undefined;
    age?: string | undefined;
    type?: string | undefined;
    method?: string | undefined;
  };
  setSearchText: (searchText: string) => void;
  setCurrentPage: (page: number) => void;
  setTotalPage: (totalPage: number) => void;
  setSelects: (selectsObj: {
    sort?: string | undefined;
    gender?: string | undefined;
    age?: string | undefined;
    type?: string | undefined;
    method?: string | undefined;
  }) => void;
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
  researchType: '',
  procedure: '',
  enddate: '',
  link: '',
  time: '',
  title: '',
  content: '',
  setAge: (newAge) =>
    set((state) => ({
      age: state.age.includes(newAge) ? state.age : [newAge, ...state.age],
    })),
  toggleAge: (newAges) =>
    set((state) => ({
      age: state.age.filter((age) => newAges.includes(age)),
    })),
  setGender: (genderValue) => set({ gender: genderValue }),
  setResearchType: (type) => set({ researchType: type }),
  setprocedureArray: (method) => set({ procedure: method }),
  setLink: (linkValue) => set({ link: linkValue }),
  setTime: (timeValue) => set({ time: timeValue }),
  setTitle: (titleValue) => set({ title: titleValue }),
  setAges: (agesValue) => set({ age: agesValue }),
  setContent: (contentvalue) => set({ content: contentvalue }),
  setEnddate: (dateValue) => set({ enddate: dateValue }),
}));

export const MainPageStore = create<MainPageStoreProps>()((set) => ({
  searchText: '',
  currentPage: 1,
  totalPage: 1,
  selects: {
    sort: undefined,
    gender: undefined,
    age: undefined,
    type: undefined,
    method: undefined,
  },
  setSearchText: (searchTextValue) => set({ searchText: searchTextValue }),
  setCurrentPage: (pageValue) => set({ currentPage: pageValue }),
  setTotalPage: (totalPageValue) => set({ totalPage: totalPageValue }),
  setSelects: (selectsObj) =>
    set((prev) => ({
      selects: { ...prev.selects, ...selectsObj },
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
