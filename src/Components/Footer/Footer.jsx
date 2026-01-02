import React from 'react';
import { AiOutlineX } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FaLinkedin  } from "react-icons/fa";
import { IoLogoGithub } from 'react-icons/io';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className=" max-w-7xl mx-auto">
            <div className="footer sm:footer-horizontal  text-white p-10">
                <nav>
                    <Link to={"/contact"} className="footer-title link link-hover">Contact Info</Link>
                    <p>Street:   ullon road, west rampura, rampura, 1219</p>
                    <p>City:Dhaka</p>
                    <p>State/province/area:Dhaka</p>
                    <p>Country:  Bangladesh</p>
                </nav>

                <nav>
                    <h6 className="footer-title">Services</h6>
                    <Link to='/add-export' className="link link-hover">Export</Link>
                    <Link to='/about' className="link link-hover">About</Link>
                    <Link to='/terms' className="link link-hover">Terms and Condition</Link>
                </nav>

                <nav>
                    <h6 className="footer-title">Social</h6>
                    <Link to={"https://www.linkedin.com/in/nusrat-jahan-web/"} className="link link-hover flex items-center gap-3 "><FaLinkedin />LinkedIn</Link>
                    <Link to={"https://www.facebook.com/nusratjahan.825908"} className="link link-hover flex items-center gap-3"><BsFacebook />Facebook</Link>
                    <Link to={"https://github.com/NusratJahanNila"} className="link link-hover flex items-center gap-3"><IoLogoGithub />GitHub</Link>
                </nav>
            </div>
            <aside className='text-center text-white p-4'>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Trade Sphere Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;