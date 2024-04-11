import { useEffect, useState } from 'react';

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
import LogoutAlertModal from '../organisms/LogoutAlertModal';
import { MainPageStore } from '../store/store';
import { Appbar } from '../stories/appbar/Appbar';
import { Dropdown } from '../stories/dropdown/Dropdown';
import FloatingButton from '../stories/floatingButton/FloatingButton';
import { Tabbar } from '../stories/tabbar/Tabbar';
import Typography from '../stories/typography/Typography';

import { useLocation, useNavigate } from 'react-router-dom';

const dropdownOptions = [
  { defaultValue: '정렬', key: 'sort', arr: mainSortArr },
  { defaultValue: '성별', key: 'gender', arr: mainGenderArr },
  { defaultValue: '나이', key: 'age', arr: mainAgeArr },
  { defaultValue: '종류', key: 'researchType', arr: mainTypeArr },
  { defaultValue: '진행방식', key: 'procedure', arr: mainMethodArr },
];

const Index = () => {
  // 사용자 로그인 상태를 저장하기 위한 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // LoginAlertModal을 제어하기 위한 상태
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // LogoutAlertModal을 제어하기 위한 상태
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const { currentPage, selects, setCurrentPage, setSelects } = MainPageStore(); // store 불러옴
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.quit) {
      setIsLoggedIn(false);
    } else {
      const fetchUserStatus = async () => {
        const userStatus = await userCheckApi();
        setIsLoggedIn(userStatus);
      };
      fetchUserStatus();
    }

    document.body.style.backgroundColor = '#F9F9FB';

    const queryParams = new URLSearchParams(location.search);
    const initialSelectedValues: Record<string, string> = {};

    queryParams.forEach((value, key) => {
      initialSelectedValues[key] = value;
    });

    setSelects(initialSelectedValues);
    // `page` 쿼리 파라미터를 확인하여 `currentPage` 상태를 설정
    const pageFromURL = queryParams.get('page');
    const page = pageFromURL ? parseInt(pageFromURL, 10) : 1;

    if (page !== 1) {
      setCurrentPage(page);
    }

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
    const queryParams = new URLSearchParams(window.location.search);

    // selects 상태를 기반으로 쿼리 파라미터 업데이트
    Object.keys(selects).forEach((key) => {
      if (selects[key]) {
        queryParams.set(key, selects[key]!);
      } else {
        queryParams.delete(key);
      }
    });

    // 현재 페이지를 쿼리 스트링에 추가하거나 업데이트
    if (currentPage >= 1) {
      queryParams.set('page', currentPage.toString());
    } else {
      queryParams.delete('page');
    }

    // 변경된 쿼리 파라미터로 navigate 함수 호출
    navigate(`?${queryParams.toString()}`, { replace: true });
  }, [selects, navigate, currentPage, location.state]);

  useEffect(() => {
    // 페이지에 처음 도달했을 때 또는 location.state가 변경될 때 실행
    if (location.state?.filterClear) {
      // filterClear가 true인 경우, selects 상태를 초기화
      setSelects({
        sort: '',
        gender: '',
        age: '',
        researchType: '',
        procedure: '',
      });
    } else {
      // 필터 초기화가 필요하지 않은 경우 혹은 기타 로직 처리...
    }

    // 필요한 나머지 로직을 여기에 추가...
  }, [location.state]);

  const soltingHandler = (key: string, selectedValue: string) => {
    handlePageChange(1); // 소팅할 때 현재 페이지 1로 변경

    // 선택된 값이 배열의 첫 번째 요소와 일치하는 경우, 해당 항목을 제거
    const clearKey = `${key.charAt(0).toUpperCase() + key.slice(1)}`;
    if (selectedValue === clearKey) {
      const newSelects = { ...selects };
      delete newSelects[key]; // 선택된 키를 selects 객체에서 제거
      setSelects(newSelects);
    } else {
      // "전체"가 아니라면 선택된 값을 상태에 추가 또는 업데이트
      setSelects({
        [key]: selectedValue !== '전체' ? selectedValue : '',
      });
    }
  };

  const renderDropDowns = () => {
    return dropdownOptions.map((option) => {
      // 현재 드롭다운 옵션에 선택된 값이 있고, 그 값이 해당 드롭다운의 defaultValue와 일치하지 않는 경우만 isActive로 설정
      // 선택된 값이 있고, 해당 값이 옵션 배열 내의 어떤 항목의 key와도 일치하지 않으면 isActive 설정
      const isActive =
        option.key in selects &&
        option.arr.some((item) => item.key === selects[option.key]);
      // 상태를 'activate' 또는 'default'로 설정, defaultValue가 선택되었거나 값이 없으면 'default'
      const state = isActive ? 'activate' : 'default';

      const optionsWithDefault = [
        { key: '', label: option.defaultValue }, // 여기서는 실제 옵션 리스트에 defaultValue를 추가
        ...option.arr,
      ];

      // 선택된 값이 있는 경우, defaultValue 대신 선택된 값을 기본값으로 설정
      let { defaultValue } = option;
      if (isActive) {
        const selectedValue = selects[option.key as keyof typeof selects];
        const selectedItem = optionsWithDefault.find(
          (item) => item.key === selectedValue
        );
        defaultValue = selectedItem ? selectedItem.label : option.defaultValue;
      }

      return (
        <Dropdown
          key={option.key}
          defaultValue={defaultValue}
          isArrow
          state={state}
          oneSelect
          menu={optionsWithDefault}
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

  return (
    <div className='relative'>
      {isLoggedIn ? (
        <div>
          <Appbar
            isAccount
            isLogo
            isFullLogo
            logout={() => {
              setShowLogoutAlert(true);
            }}
          />
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
          <div>
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
                selectedValues={selects}
                checkDeviceReturnLimit={checkDeviceReturnLimit}
                handlePageChange={handlePageChange}
                setShowLoginAlert={setShowLoginAlert}
                isLoggedIn={isLoggedIn}
              />
            </div>
            <div className='sticky flex flex-row-reverse bottom-[50px] z-[49]'>
              <FloatingButton onClick={() => navigate('/write')} />
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
      <LogoutAlertModal
        isOpen={showLogoutAlert}
        handleClose={() => setShowLogoutAlert(false)}
        goLogout={async () => {
          await requestLogout();
          setIsLoggedIn(false);
          setShowLogoutAlert(false);
        }}
      />
    </div>
  );
};

export default Index;
