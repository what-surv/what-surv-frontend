import { create } from 'zustand';

interface WritePageStoreStoreProps {
  gender: string; // 성별
  age: string[]; // 연령
  researchType: string; // 리서치 종류
  procedure: string; // 진행 방식
  enddate: Date; // 마감일
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
}

export const WritePageStore = create<WritePageStoreStoreProps>((set) => ({
  gender: '',
  age: [],
  researchType: '',
  procedure: '',
  enddate: new Date(),
  link: '',
  time: '',
  title: '',
  content: '',
  setAge: (age) =>
    set((state) => ({
      age: state.age.concat(age),
    })),
  setGender: (genderValue) => set({ gender: genderValue }),
  setResearchType: (type) => set({ researchType: type }),
  setprocedureArray: (method) => set({ procedure: method }),
  setLink: (linkValue) => set({ link: linkValue }),
  setTime: (timeValue) => set({ time: timeValue }),
  setTitle: (titleValue) => set({ title: titleValue }),
  setContent: (contentvalue) => set({ content: contentvalue }),
  setEnddate: (dateVale) => set({ enddate: dateVale }),
}));
