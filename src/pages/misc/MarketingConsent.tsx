import styles from './miscStyle.module.css';
import Typography from '../../stories/typography/Typography';

const MarketingConsent = () => {
  return (
    <div className='max-w-[342px] w-full m-auto'>
      <div className='flex flex-col gap-4 pb-[20px]'>
        <p>
          <Typography
            size='xl2'
            text='💡'
            weight='Bold'
            className='relative -left-[25px] text-neutral-800 text-[70px] leading-[70px]'
          />
        </p>
        <Typography
          size='xl2'
          text='마케팅 정보 수신 및 이용 동의'
          weight='Bold'
        />
      </div>

      <section className={styles.termsSection}>
        <Typography
          size='xs'
          text='귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으나, 동의를 거부하는 경우 SurveyIT(서베잇)가 제공하는 각종 소식 및 편의제공(이벤트 안내, 공지사항, 업데이트 사항)안내와 관련된 정보를 더 이상 제공 받으실 수 없으며 혜택에 제한이 있을 수 있습니다.
그 밖에 계약과 관련된 불이익은 없습니다. 동의한 경우에도 귀하는 동의를 철회하거나 마케팅 목적으로 귀하에게 연락하는 것을 중지하도록 요청할 수 있습니다.'
          weight='Regular'
        />
      </section>

      <section className={styles.termsSection}>
        <Typography size='xs' text='1. 전송방법' weight='Bold' />
        <p>
          <Typography
            size='xs'
            text='마케팅 정보 전송 방법은 고객님의 E-mail 등을 통해 자체 서비스에서 정한 방식에 따라 전송됩니다.'
            weight='Regular'
          />
        </p>
      </section>

      <section className={styles.termsSection}>
        <Typography size='xs' text='2. 전송내용' weight='Bold' />
        <p>
          <Typography
            size='xs'
            text='발송되는 마케팅 정보는 수신자에게 SurveyIT(서베잇)가 운영하는 서비스에서 제공하는 혜택 정보, 각종 이벤트 정보, 신규 서비스 안내 등 광고성 정보로 관련 법의 규정을 준수하여 발송됩니다. 단, 광고성 정보 이외 의무적으로 안내되어야 하는 정보성 내용은 수신동의 여부와 무관하게 제공됩니다.'
            weight='Regular'
          />
        </p>
      </section>

      <section className={styles.termsSection}>
        <Typography size='xs' text='3. 철회안내' weight='Bold' />
        <p>
          <Typography
            size='xs'
            text='수신동의 이후에라도 언제든지 동의를 철회할 수 있으며, 수신을 동의하지 않아도 회사가 제공하는 기본적인 서비스를 이용하실 수 있습니다. 다만 수신 거부할 경우 신규 서비스나 이벤트 관련 소식 등의 마케팅 정보를 제공받지 못할 수 있습니다.'
            weight='Regular'
          />
        </p>
      </section>

      <section className={styles.termsSection}>
        <Typography size='xs' text='4. 수집 및 이용목적' weight='Bold' />
        <p>
          <Typography
            size='xs'
            text='고객에 대한 편의제공, 귀사 및 제휴업체의 상품·서비스 안내 및 이용권유, 마케팅 활동, 시장조사 및 상품·서비스 개발연구 등을 목적으로 수집·이용합니다.'
            weight='Regular'
          />
        </p>
      </section>

      <section className={styles.termsSection}>
        <Typography size='xs' text='5. 수신동의 변경' weight='Bold' />
        <p>
          <Typography
            size='xs'
            text='이메일(SurveyIT2024@gmail.com)을 통해 수신동의를 변경(동의)할 수 있습니다.'
            weight='Regular'
          />
        </p>
      </section>

      <section className={styles.termsSection}>
        <Typography size='xs' text='6. 개인정보 이용 상세내용' weight='Bold' />
        <ul className={styles.termsList}>
          <li>
            <p>
              개인정보 수집 항목: 이메일 주소, 생년월일, 성별, 별명, 이용 기록,
              고객 ID, 접속 일시, IP주소 등
            </p>
          </li>
          <li>
            <p>
              개인정보 수집 이용 목적: 각종 이벤트 정보, 상품 정보, 신규 서비스
              안내 등 광고성 정보 제공.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.termsSection}>
        <Typography
          size='xs'
          text='7.개인정보 보유 및 이용 기간'
          weight='Bold'
        />
        <p>
          <Typography
            size='xs'
            text='마케팅 활용 동의일부터 회원 탈퇴 또는 마케팅 동의 철회 시까지 보유 및 이용합니다.'
            weight='Regular'
          />
        </p>
      </section>
    </div>
  );
};

export default MarketingConsent;
