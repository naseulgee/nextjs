import Head from 'next/head';
import HomeStyles from '../styles/Home.module.css';
import { GetStaticProps//빌드 시 데이터를 미리 호출용
        , NextPage
      } from 'next';
import { getSortedPostsData } from '../lib/post';//파일 목록
import Link from 'next/link';//파일 기반 라우팅용

//미리 호출한 데이터를 사용하기 위해 매개변수로 선언
export default function Home({allPostsData}: {
  //allPostsData 타입 정의
  allPostsData: {
    id: string//객체 안의 내용 정의
    date: string
    title: string
  }[]//배열 안의 객체임을 정의
}) {
  return (
    <div>
      <Head>
        <title>Seulgee Na</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* 클래스명 사용 시 className이라는 속성을 사용하며, 값으로 중괄호로 감싼 후 css파일명.클래스명 으로 사용한다 */}
      <section className={HomeStyles.headingMd}>
        <p>[Seulgee Na]</p>
        <p>(This is a website)</p>
      </section>

      {/* 여러개의 클래스명을 사용 시 중괄호 안에 백팁으로 감싼 후 ${}를 이용해 클래스명을 나열한다 */}
      <section className={`${HomeStyles.headingMd} ${HomeStyles.padding1px}`}>
        <h2 className={HomeStyles.headingLg}>Blog</h2>
        <ul className={HomeStyles.list}>
          {allPostsData.map(({id, title, date}) => 
            <li className={HomeStyles.listItem} key={id}>
              {/* Link 객체 클릭 시 [id].tsx 파일로 이동한다 */}
              <Link href={`/posts/${id}`}>{title}</Link>
              <br/>
              <small className={HomeStyles.lightText}>
                {date}
              </small>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}

//getStaticProps: 빌드 시 데이터를 미리 호출
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()//파일 목록 불러오기
  return { props: { allPostsData }}
}