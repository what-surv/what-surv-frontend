import { create } from 'zustand';

interface WritePageStoreStoreProps {
  gender: string; // 성별
  ageArray: string[]; // 연령
  researchType: string; // 리서치 종류
  progressMethodValue: string; // 진행 방식
  enddate: Date | string; // 마감일
  link: string; // 링크
  time: string; // 소요 시간
  content: string; // 본문
  title: string; // 제목
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
  setResearchType: (type: string) => void;
  setprogressMethodValueArray: (type: string) => void;
  setLink: (link: string) => void;
  setTime: (time: string) => void;
  setTitle: (title: string) => void;
}

export const WritePageStore = create<WritePageStoreStoreProps>((set) => ({
  gender: '',
  ageArray: [],
  researchType: '',
  progressMethodValue: '',
  enddate: '날짜 선택',
  link: '',
  time: '',
  title: '',
  content: '',
  setAge: (age) =>
    set((state) => ({
      ageArray: state.ageArray.concat(age),
    })),
  setGender: (genderValue) => set({ gender: genderValue }),
  setResearchType: (type) => set({ researchType: type }),
  setprogressMethodValueArray: (method) => set({ progressMethodValue: method }),
  setLink: (linkValue) => set({ link: linkValue }),
  setTime: (timeValue) => set({ time: timeValue }),
  setTitle: (titleValue) => set({ title: titleValue }),
}));
