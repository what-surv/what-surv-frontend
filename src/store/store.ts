import { create } from 'zustand';

interface WritePageStoreStoreProps {
  gender: string[];
  ageArray: string[];
  enddate: Date | string;
  link: string;
  time: string;
  setAge: (age: string) => void;
}

export const WritePageStore = create<WritePageStoreStoreProps>((set) => ({
  gender: [],
  ageArray: [],
  enddate: '날짜 선택',
  link: '',
  time: '',
  setAge: (age) =>
    set((state) => ({
      ageArray: state.ageArray.concat(age),
    })),
}));
