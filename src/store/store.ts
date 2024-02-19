import { create } from 'zustand';

interface WritePageStoreStoreProps {
  genderArray: string[];
  ageArray: string[];
  researchTypeArray: string[];
  progressMethodValueArray: string[];
  enddate: Date | string;
  link: string;
  time: string;
  setAge: (age: string) => void;
  setGender: (gender: string) => void;
  setResearchType: (type: string) => void;
  setprogressMethodValueArray: (type: string) => void;
}

export const WritePageStore = create<WritePageStoreStoreProps>((set) => ({
  genderArray: [],
  ageArray: [],
  researchTypeArray: [],
  progressMethodValueArray: [],
  enddate: '날짜 선택',
  link: '',
  time: '',
  setAge: (age) =>
    set((state) => ({
      ageArray: state.ageArray.concat(age),
    })),
  setGender: (gender) =>
    set((state) => ({
      genderArray: state.genderArray.concat(gender),
    })),
  setResearchType: (type) =>
    set((state) => ({
      researchTypeArray: state.researchTypeArray.concat(type),
    })),
  setprogressMethodValueArray: (method) =>
    set((state) => ({
      progressMethodValueArray: state.progressMethodValueArray.concat(method),
    })),
}));
