import { GetStaticPaths, GetStaticProps } from "next"
import React from "react"
import { getAllPostIds, getPostData } from '../../lib/post';//파일 목록
import Head from "next/head";

export default function Post({postData}:{
    postData: {
        date: string
        title: string
        contentHtml: string
    }
}) {
    return (
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1>{postData.title}</h1>
                <div>{postData.date}</div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
            </article>
        </div>
    )
}

//렌더링 전 경로 목록 가져오기 -> 동적인 id에 맞는 데이터를 가져오기 위해 사용한다.
export const getStaticPaths: GetStaticPaths = async() => {
    const paths = getAllPostIds()
    console.log("paths", paths)
    //[{params: {id: "pre-rendering"}}, {params: {id: "ssg-ssr"}}]
    return {
        paths,
        fallback: false//false일 경우 getStaticPaths로 리턴되지 않는 것은 모두 404 페이지를 띄운다
    }
}

//전달받은 아이디를 이용해서 해당 포스트의 데이터 가져오기
export const getStaticProps: GetStaticProps = async ({params}) => {
    console.log("params", params)
    //{id: "pre-rendering"}
    const postData = await getPostData(params.id as string)
    return { props: {postData} }
}