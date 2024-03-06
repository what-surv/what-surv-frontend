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

interface MainPageStoreProps {
  searchText: string;
  pageIdx: number;
  selects: string[];
  setSearchText: (searchText: string) => void;
  setPageIdx: (pageIdx: number) => void;
  setSelects: (selectsArr: string[]) => void;
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
  setContent: (contentvalue) => set({ content: contentvalue }),
  setEnddate: (dateValue) => set({ enddate: dateValue }),
}));

export const MainPageStore = create<MainPageStoreProps>()((set) => ({
  searchText: '',
  pageIdx: 0,
  selects: [],
  setSearchText: (searchTextValue) => set({ searchText: searchTextValue }),
  setPageIdx: (pageIdxValue) => set({ pageIdx: pageIdxValue }),
  setSelects: (selectsArr) => set({ selects: selectsArr }),
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
