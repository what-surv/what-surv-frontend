import React, { useEffect, useState } from 'react';

import {
  mainAgeArr,
  mainGenderArr,
  mainMethodArr,
  mainSortArr,
  mainTypeArr,
} from '../api/IndexApi';
import { requestLogout } from '../api/loginApis';
import { userCheckApi } from '../api/userCheckApi';
import { BannerSwiper, ResearchSwiper } from '../component/MainSwiper';
import CardList from '../organisms/CardList';
import LoginAlertModal from '../organisms/LoginAlertModal';
import { MainPageStore } from '../store/store';
import { Appbar } from '../stories/appbar/Appbar';
import { Dropdown } from '../stories/dropdown/Dropdown';
import FloatingButton from '../stories/floatingButton/FloatingButton';
import { Tabbar } from '../stories/tabbar/Tabbar';
import Typography from '../stories/typography/Typography';

import { useNavigate } from 'react-router-dom';

const dropdownOptions = [
  { defaultValue: '정렬', key: 'sort', arr: mainSortArr },
  { defaultValue: '성별', key: 'gender', arr: mainGenderArr },
  { defaultValue: '나이', key: 'age', arr: mainAgeArr },
  { defaultValue: '종류', key: 'research_type', arr: mainTypeArr },
  { defaultValue: '진행방식', key: 'procedure', arr: mainMethodArr },
];

const Index = () => {
  // 사용자 로그인 상태를 저장하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // LoginAlertModal을 제어하기 위한 상태
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  ); // 소팅 객체를 저장할 state

  const { currentPage, setCurrentPage } = MainPageStore(); // store 불러옴
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 사용자 체크를 수행
    const fetchUserStatus = async () => {
      const userStatus = await userCheckApi();
      setIsLoggedIn(userStatus); // 비동기 호출의 결과로 로그인 상태 업데이트
    };

    fetchUserStatus();

    document.body.style.backgroundColor = '#F9F9FB';

    // URL에서 쿼리 스트링을 파싱
    const queryParams = new URLSearchParams(window.location.search);
    const initialSelectedValues: Record<string, string> = {};

    queryParams.forEach((value, key) => {
      initialSelectedValues[key] = value;
    });

    // 초기 상태를 설정
    setSelectedValues(initialSelectedValues);

    return () => {
      document.body.style.backgroundColor = '#F2F3F7';
    };
  }, []);

  // 디바이스 체크해서 limit에 전달  PC : 24, Mobile : 7
  const checkDeviceReturnLimit = () => {
    if (window.innerWidth < 768) {
      return 7; // mobile
    }
    return 24; // PC
  };

  useEffect(() => {
    const queryString = Object.keys(selectedValues)
      .map(
        (queryKey) =>
          `${encodeURIComponent(queryKey)}=${encodeURIComponent(selectedValues[queryKey])}`
      )
      .join('&');

    navigate(`?${queryString}`);
  }, [selectedValues]);

  const soltingHandler = (key: string, selectedValue: string) => {
    handlePageChange(1); // 소팅할 때 현재 페이지 1로 변경

    if (selectedValue === 'All') {
      // "전체"가 선택되면 해당 키를 상태에서 제거
      setSelectedValues((prevSelectedValues) => {
        const updatedValues = { ...prevSelectedValues, [key]: selectedValue };

        delete updatedValues[key]; // 선택된 키 제거

        return updatedValues;
      });
    } else {
      // "전체"가 아니라면 선택된 값을 상태에 추가 또는 업데이트
      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        [key]: selectedValue,
      }));
    }
  };

  const renderDropDowns = () => {
    return dropdownOptions.map((option) => {
      // 해당 dropdown option의 key 값에 대한 선택된 값이 있는지 확인
      const isActive =
        option.key in selectedValues && selectedValues[option.key] !== '';

      // 상태를 'active' 또는 'default'로 설정
      const state = isActive ? 'activate' : 'default';
      // 선택된 값이 있는 경우에는 defaultValue 대신 선택된 값을 전달
      let defaultValue;
      if (isActive) {
        const selectedValue = selectedValues[option.key];
        const selectedItem = option.arr.find(
          (item) => item.key === selectedValue
        );
        defaultValue = selectedItem ? selectedItem.label : option.defaultValue;
      } else {
        defaultValue = option.defaultValue;
      }
      return (
        <Dropdown
          key={option.key}
          defaultValue={defaultValue}
          isArrow
          state={state}
          oneSelect
          menu={option.arr}
          // (selectedValue) => soltingHandler(option.key, selectedValue)
          onDropdownChange={(selectedValue) =>
            soltingHandler(option.key, selectedValue)
          }
        />
      );
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const logout = async () => {
    await requestLogout();
    setIsLoggedIn(false);
  };

  return (
    <div className='relative'>
      {isLoggedIn ? (
        <div>
          <Appbar isAccount isLogo isFullLogo logout={logout} />
        </div>
      ) : (
        <Appbar isLogo isFullLogo isLogin />
      )}
      <Tabbar isMobileVisible size='default' />
      <div className=''>
        <div className='max-w-[1464px] w-full m-auto px-6'>
          <div className='my-6'>
            <BannerSwiper />
          </div>

          {/* 인기리서치 */}
          <ResearchSwiper />
          {/* // 인기리서치 */}

          {/* IT전체 */}
          <div className='mt-6 mb-3'>
            <Typography size='base' text='IT전체' weight='Semibold' />
          </div>

          <div className='flex flex-wrap gap-3 mb-6'>{renderDropDowns()}</div>
          {/* cardList */}
          <div>
            <CardList
              currentPage={currentPage}
              selectedValues={selectedValues}
              checkDeviceReturnLimit={checkDeviceReturnLimit}
              handlePageChange={handlePageChange}
              setShowLoginAlert={setShowLoginAlert}
            />
            <div className='sticky flex flex-row-reverse bottom-[50px] z-[49]'>
              <FloatingButton onClick={() => navigate('write')} />
            </div>
          </div>
        </div>
      </div>
      <LoginAlertModal
        isOpen={showLoginAlert}
        handleClose={() => setShowLoginAlert(false)}
        goLogin={() => {
          navigate('/login');
        }}
      />
    </div>
  );
};

export default Index;
