import CommingSoon from './misc/CommingSoon';
import { Appbar } from '../stories/appbar/Appbar';
import { Tabbar } from '../stories/tabbar/Tabbar';

const Lite = () => {
  return (
    <div>
      <Appbar isAccount isLogo isFullLogo />
      <Tabbar isMobileVisible size='default' />
      <div className='max-w-[770px] w-full min-h-[calc(100vh_-_662px)] m-auto'>
        <CommingSoon />
      </div>
    </div>
  );
};

export default Lite;
