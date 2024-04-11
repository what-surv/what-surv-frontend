import style from './login.module.css';
import { useUserInfoStore } from '../../store/store';
import Typography from '../../stories/typography/Typography';

import { Link } from 'react-router-dom';

export interface TermsOfServiceAgreementPageProps {
  onNextStep: () => void;
  checkboxStates: {
    id: string;
    checked: boolean;
    href: string;
    label: string;
  }[];
  handleAllCheckboxChange: () => void;
  handleCheckboxChange: (id: string) => void;
  isAllChecked: boolean;
}

const TermsOfServiceAgreementPage = ({
  onNextStep,
  handleAllCheckboxChange,
  handleCheckboxChange,
  checkboxStates,
  isAllChecked,
}: TermsOfServiceAgreementPageProps) => {
  const { setAdvertisingConsent } = useUserInfoStore();

  const onClick = () => {
    if (checkboxStates[2].checked) {
      setAdvertisingConsent(true);
    } else {
      setAdvertisingConsent(false);
    }
    onNextStep();
  };
  return (
    <div>
      <div className='mb-6'>
        <Typography text='서비스 이용 약관 동의' size='lg' weight='Bold' />
      </div>

      <div className={style['checkbox-wrap']}>
        <label htmlFor='all' className={isAllChecked ? style.on : ''}>
          <input
            id='all'
            type='checkbox'
            checked={isAllChecked}
            onChange={handleAllCheckboxChange}
          />
          <span>전체 동의하기</span>
        </label>
      </div>
      {checkboxStates.map((params) => {
        const { id, href, label } = params;

        return (
          <div key={id} className={style['checkbox-wrap']}>
            <label
              htmlFor={id}
              className={checkboxStates[Number(id)].checked ? style.on : ''}
            >
              <input
                id={id}
                type='checkbox'
                checked={checkboxStates[Number(id)].checked}
                onChange={() => handleCheckboxChange(id)}
              />
              <span>{label}</span>
            </label>
            <p className='w-[39px] text-right'>
              <Link to={href}>보기</Link>
            </p>
          </div>
        );
      })}

      <button
        type='button'
        className={style['basic-btn']}
        disabled={!checkboxStates['0'].checked || !checkboxStates['1'].checked}
        onClick={onClick}
      >
        다음
      </button>
    </div>
  );
};

export default TermsOfServiceAgreementPage;
