import React, { Component } from 'react';
import { Link } from 'next/link';
// import './index.scss';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowIconOn: false,
    };
  }

  toggleArrowIcon = () => {
    this.setState({
      arrowIconOn: !this.state.arrowIconOn,
    });
  };

  render() {
    const { arrowIconOn } = this.state;

    return (
      <div className="Footer">
        <section className="footerWrap">
          <div className="footerContainer">
            <div className="infoSection">
              <Link href="/" className="infoLink">
                제휴문의
              </Link>
              <Link href="/" className="infoLink">
                고객문의
              </Link>
              <Link href="/" className="infoLink">
                이용약관
              </Link>
              <Link href="/" className="infoLink">
                개인정보처리방침
              </Link>
              <Link href="/" className="infoLink">
                지식재산권보호센터
              </Link>
            </div>
            <div className="companySection">
              <div className="logoToggle">
                <span className="logo">
                  kakao<span className="bold">petshop</span>
                </span>
                <span
                  className={
                    arrowIconOn ? 'logoToggleIcon active' : 'logoToggleIcon'
                  }
                  onClick={this.toggleArrowIcon}
                />
              </div>
            </div>
            {arrowIconOn && (
              <div className="companyInfoSection">
                <div class="title">
                  <span className="companyInfo">(주)그레이스풀레인</span>
                  <span className="companyInfo">주소</span>
                  <span className="companyInfo">사업자등록번호</span>
                  <span className="companyInfo">호스팅서비스사업자</span>
                  <span className="companyInfo">이메일</span>
                  <span className="companyInfo">고객센터</span>
                </div>
                <div className="para">
                  <span className="companyInfo">대표이사 송은우</span>
                  <span className="companyInfo">
                    서울특별시 강남구 테헤란로 427, 위워크타워
                  </span>
                  <span className="companyInfo">530-81-01310</span>
                  <span className="companyInfo">(주)그레이스풀레인</span>
                  <span className="companyInfo">store@kakaopetshop.com</span>
                  <span className="companyInfo">1577-6263</span>
                  <span className="companyInfo">
                    전화상담 (평일 10:00~18:00)
                  </span>
                  <span className="companyInfo">
                    카카오톡 상담 (평일 10:00~18:00)
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }
}
