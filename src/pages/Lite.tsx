import CommingSoon from './misc/CommingSoon';
import { Appbar } from '../stories/appbar/Appbar';
import { Tabbar } from '../stories/tabbar/Tabbar';

const Lite = () => {
  return (
    <div>
      <Appbar
        isAccount
        isFullLogo
        isLogo
        isSearch
        onArrowClick={() => {}}
        size='full'
      />
      <Tabbar isMobileVisible size='default' />
      <div className='max-w-[770px] w-full m-auto'>
        <CommingSoon />
      </div>
    </div>
  );
};

export default Lite;
