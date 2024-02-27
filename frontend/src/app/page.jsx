'use client';
import React from 'react';
import * as css from './page.module.css';
import { useRouter } from 'next/navigation';
// import GraphQL from './assets/GraphQL.mp4';

const Home = () => {
  const Router = useRouter();
  return (
    <div className="container">
      <div className='row ms-5 me-5 mt-5'>
        <p className="fs-2">
          If you've seen a GraphQL query before, you know that the GraphQL query language is basically about selecting fields on objects. So, for example, in the following query:
        </p>
      </div>
      <div className="row ms-5 me-5">
        <div className='table-responsive'>
          <table className='table table-bordered border-primary'  >
            <thead>
              <tr>
                <th className='fs-5 text-center'>Query</th>
                <th className='fs-5 text-center'>Result</th>
              </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <pre className='fs-6'>
                  {`
{
  hero {
    name
    appearsIn
  }
}                  
                `}
                </pre>
              </td>
              <td>
                <pre className='fs-6'>
                  {`
{
    "data": {
      "hero": {
        "name": "R2-D2",
        "appearsIn": [
          "NEWHOPE",
          "EMPIRE",
          "JEDI"
        ]
      }
    }
  }
  `}
                </pre>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row ms-5 me-5 mt-4">
        <div className='col-md-3'>
          <video className="w-100 h-100" muted autoPlay>
            <source src="/GraphQL.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="col-md-3">
          <h4>Describe your data</h4>
          <p>Describe your data in the schema definition language (SDL)</p>
          <div className='table-responsive'>
            <table className='table table-borderless table-dark'  >
              <tbody>
              <tr>
                <td>
                  <pre>
                    {`
type Project {
  name: String
  tagline: String
  contributors: [User]
}
`}
                  </pre>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-3">
          <h4>Ask for what you want</h4>
          <p>Specify the operations you want to perform.</p>
          <div className='table-responsive'>
            <table className='table table-borderless table-dark'  >
              <tr>
                <td>
                  <pre>
                    {`
{
  project(name: "GraphQL") {
    tagline
  }
}
`}
                  </pre>
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="col-md-3">
          <h4>Get desired response</h4>
          <p>Get the exact data you asked for...............</p>
          <div className='table-responsive'>
            <table className='table table-borderless table-dark'  >
              <tr>
                <td>
                  <pre>
                    {`
{
  "project": {
    "tagline": "A query language"
  }
}
`}
                  </pre>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center m-5">
        <button onClick={() => Router.push('login')} type="button" id='button' className="btn btn-outline-dark p-2 m-2">Login</button>
        <button onClick={() => Router.push('signup')} type="button" id='button' className="btn btn-outline-dark p-2 m-2">Signup</button>
      </div>
    </div>
  )
}

export default Home

// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <main className={styles.main}>
//       <div className={styles.description}>
//         <p>
//           Get started by editing&nbsp;
//           <code className={styles.code}>src/app/page.js</code>
//         </p>
//         <div>
//           <a
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className={styles.vercelLogo}
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className={styles.center}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className={styles.grid}>
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Docs <span>-&gt;</span>
//           </h2>
//           <p>Find in-depth information about Next.js features and API.</p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Learn <span>-&gt;</span>
//           </h2>
//           <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Templates <span>-&gt;</span>
//           </h2>
//           <p>Explore starter templates for Next.js.</p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className={styles.card}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2>
//             Deploy <span>-&gt;</span>
//           </h2>
//           <p>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
