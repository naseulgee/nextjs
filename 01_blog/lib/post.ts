//.md 파일을 데이터화 시키는 함수들
//npm install --save gray-matter
//npm install remark remark-html --save

//사용할 모듈 호출
import fs from "fs"//파일 객체 읽기용
import path from "path"//경로 추출용
import matter from "gray-matter"//마크다운 파일의 front matter(메타 데이터)를 추출용. -> npm 설치 필요
import {remark} from "remark"//마크다운 변환용. -> npm 설치 필요
import remarkHtml from "remark-html"//마크다운의 html 변환용. -> npm 설치 필요

//posts 디렉토리 경로 정의(어플 주소 + posts)
const postsDirectory = path.join(process.cwd(), "posts")
console.log("process.cwd()", process.cwd());//어플의 물리적 주소 가져오기
console.log("postsDirectory", postsDirectory);// D:\study\Front\NextJS\01_blog

export function getSortedPostsData(){
    //posts 디렉토리 내부의 파일명들 배열로 가져오기
    const fileNames = fs.readdirSync(postsDirectory)
    console.log("fileNames", fileNames);//["pre-rendering.md", "ssg-ssr.md"]

    //메타 데이터 추출
    const allPostsData = fileNames.map(fileName => {//배열이기 때문에 map 함수를 이용해 하나씩 작업
        //파일명에서 .md 확장자 제거
        const id = fileName.replace(/\.md$/, "")

        //파일 경로 정의(posts 디렉토리 경로 + 파일명)
        const fullPath = path.join(postsDirectory, fileName)
        //파일 읽어들이기
        const fileContents = fs.readFileSync(fullPath, "utf-8")
        //메타 데이터 추출(JS의 객체 형식으로 추출된다)
        const matterResult = matter(fileContents)

        //객체 리턴
        return {
            id,//파일명
            ...matterResult.data as {date: string; title: string}//타입을 정의한 메타 데이터
        }
    })

    //추출된 메타 데이터들을 날짜 기준으로 정렬하여 리턴
    return allPostsData.sort((a, b) => {//배열의 정렬 함수
        if(a.date < b.date) return 1//위에 정렬
        return -1//아래에 정렬
    })
}

//모든 파일명을 가져오는 함수
export function getAllPostIds(){
    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(fileName => {
        return { params: { id: fileName.replace(/\.md$/, "") }}
    })
}

//특정 파일을 가져오는 함수
export async function getPostData(id: string){
    //파일 경로 정의(posts 디렉토리 경로 + 파일명)
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    const matterResult = matter(fileContents)

    //html로 변환
    const processedContent = await remark()//변환
                                    .use(remarkHtml)//변환할 언어
                                    .process(matterResult.content)//변환 대상
    const contentHtml = processedContent.toString()

    //getSortedPostsData의 리턴값 + HTML 데이터
    return {
        id,
        ...matterResult.data as {date: string; title: string},
        contentHtml//HTML 데이터
    }
}