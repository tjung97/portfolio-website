import { useEffect, useState } from "react";
import profileImage from './assets/profiledu.jpg'
import PDFViewer from "./PDFViewer";
import {
  FaTwitter,
  FaGithub,
  FaStar,
  FaUserAlt,
  FaLinkedinIn,
  FaBehance,
  FaComments,
  FaDribbble,
  FaUserFriends,
} from "react-icons/fa";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [user, setUser] = useState({});
  const [userRepo, setUserRepo] = useState([]);
  const githubUsername = "dkdr2513";
  const [isResumeOverlayVisible, setIsResumeOverlayVisible] = useState(false);

  const handleResumeButtonClick = () => {
    setIsResumeOverlayVisible(!isResumeOverlayVisible);
  };
  const fetchData = async () => {
    const userResponse = await fetch(
      `https://api.github.com/users/${githubUsername}`
    );
    const userData = await userResponse.json();
    setUser(userData);

    const repoResponse = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`
    );
    const repoData = await repoResponse.json();
    const sortedRepos = repoData
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
    setUserRepo(sortedRepos);
  };

  useEffect(() => {
    fetchData();
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <div
      className="App text-black"
      data-aos="fade-down"
      data-aos-duration="800"
    >
      <div className="absolute w-full h-60 bg-[#1e1f24] top-40"></div>
      <div className="py-4 m-auto max-w-4xl">
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl text-white font-medium font-['Josefin']">
            <span className="text-[#8e9bcf]">Thummim</span> Jung
          </h1>
          <div className="flex gap-x-3">

            <button
              className="w-32 h-10 rounded-md text-sm text-white transition duration-300 hover:text-[#a5aed9] font-['WorkSans-Thin'] font-semibold "
              onClick={handleResumeButtonClick}
            >
              Resume
            </button>

            {isResumeOverlayVisible && (
              <div className="resume-overlay text-white">
                {/* Your resume content goes here */}
                <button onClick={() => setIsResumeOverlayVisible(false)}>Close</button>
                <PDFViewer />
                {/* You can add a close button or any other controls to close the overlay */}
                
              </div>
            )}
            <a href="mailto:durimjung97@gmail.com">
              <button className="w-32 h-10  text-sm font-['WorkSans-Thin'] text-[#ffffff] border-2 bg-transparent transition duration-300 hover:text-[#fff] hover:bg-[#8e9bcf] font-semibold">
                Let's Connect!
              </button>
            </a>
          </div>
        </nav>
        
        <main className="py-36">
        
          <div className="flex flex-row gap-x-5 relative">
            
            <div className="flex-none w-40 h-40">
              <img
                src={profileImage}
                className="w-40 h-40 transition duration-300 /30"
                alt="Profile"
              />
            </div>
            <div className="flex-col">
              <div>
                <h1 className="text-3xl text-white font-medium font-['WorkSans-Medium']">
                  Hi, I’m Thummim
                </h1>
              </div>
              
              <p className="text-lg font-medium font-['WorkSans-Light'] text-white">
                I’m a Software Developer Engineer. I am interested in Back-End engineering
              </p>
              <div className="flex py-8 font-bold">
                <a href="https://github.com/3r4y">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300  text-base bg-[#10151a] text-[#fff] hover:text-[#10151a] hover:bg-[#fff] m-2 p-2">
                    <FaGithub /> GitHub
                  </button>
                </a>
                <a href="https://twitter.com/vmdeveloper">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300  text-base bg-[#0a7ff5] text-[#fff] hover:text-[#0a7ff5] hover:bg-[#fff] m-2 p-2">
                    Facebook
                  </button>
                </a>
                <a href="/">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300  text-base bg-[#0072b1] text-[#fff]  hover:text-[#0072b1] hover:bg-[#fff] m-2 p-2">
                    <FaLinkedinIn />
                    LinkedIn
                  </button>
                </a>
                <a href="https://www.behance.net/3r4y">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300  text-base bg-[#030303] text-[#fff]  hover:text-[#030303] hover:bg-[#fff] m-2 p-2">
                    Instagram
                  </button>
                </a>
                <a href="https://dribbble.com/eraydev">
                  <button className="flex justify-center items-center w-32 gap-x-2 transition duration-300 text-base bg-[#EA4C89] text-[#fff]  hover:text-[#EA4C89] hover:bg-[#fff] m-2 p-2">
                    Youtube
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl text-white font-['WorkSans-Medium'] mt-9">
              Featured Projects
            </h1>
            <p className="fp-paragraph font-['WorkSans-Light'] text-white">
              A collection of some side projects that have shipped recently.
            </p>
            <ul className="py-6 flex flex-col items-center justify-center">
              {userRepo.map((repo) => (
                <div
                  className="rounded-lg mt-2 max-h-md px-6 py-6 w-full backdrop-blur-md transition duration-300 bg-[#182b42]/30 hover:bg-[#182b42]/80"
                  key={repo.id}
                >
                  <a
                    href={repo.html_url}
                    className="relative block overflow-hidden rounded-lg p-4 sm:p-4 lg:py-px"
                    key={repo.id}
                  >
                    <div className="sm:flex sm:justify-between sm:gap-2 ">
                      <div>
                        <h3 className="text-lg font-bold text-white sm:text-xl">
                          {repo.name.replaceAll("-", " ")}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-gray-400">
                          By {repo.owner.login}
                        </p>
                      </div>
                      <div className="hidden sm:block sm:shrink-0">
                        <img
                          src={profileImage}
                          className="h-16 w-16 rounded-lg object-cover shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="max-w-[90ch] font-semibold text-sm text-gray-200">
                        {repo.description}
                      </p>
                    </div>
                    <dl className="mt-6 flex gap-4 sm:gap-6">
                      <div className="flex flex-col">
                        <dt className="text-sm font-semibold text-gray-400 flex items-center">
                          <FaStar className="mr-1 text-[#ffffff]" />
                          {repo.stargazers_count} Stars
                        </dt>
                        <dd className="text-sm mt-2 text-gray-400 font-semibold flex justify-center items-center">
                          <FaComments className="mr-1 text-[#ffffff]" />
                          {repo.open_issues_count} Issues
                        </dd>
                      </div>
                      <div className="flex flex-col">
                        <dt className="text-sm font-semibold text-gray-400 flex items-center">
                          <FaUserAlt className="mr-1 text-[#ffffff]" />
                          {repo.forks_count} Forks
                        </dt>
                      </div>
                    </dl>
                    {repo.language && (
                      <div className="absolute bottom-0 right-0 text-sm mt-2 px-4 text-white font-semibold p-1 bg-[#05BFDB]/20 border border-[#05BFDB] rounded-xl flex justify-center items-center">
                        Java
                      </div>
                    )}
                  </a>
                </div>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
