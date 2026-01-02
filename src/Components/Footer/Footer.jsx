import React from 'react';
import { AiOutlineX } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';

const Footer = () => {
    return (
        <footer className=" max-w-7xl mx-auto">
            <div className="footer sm:footer-horizontal  text-white p-10">
                <nav>
                    <h6 className="footer-title">Contact Info</h6>
                    <p>Street:   ullon road, west rampura, rampura, 1219</p>
                    <p>City:Dhaka</p>
                    <p>State/province/area:Dhaka</p>
                    <p>Country:  Bangladesh</p>
                </nav>

                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>

                <nav>
                    <h6 className="footer-title">Social</h6>
                    <a className="link link-hover flex items-center gap-3"><AiOutlineX />X</a>
                    <a className="link link-hover flex items-center gap-3"><FaInstagram />Instagram</a>
                    <a className="link link-hover flex items-center gap-3"><BsFacebook />Facebook</a>
                    <a className="link link-hover flex items-center gap-3"><IoLogoGithub />GitHub</a>
                </nav>
            </div>
            <aside className='text-center text-white p-4'>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Trade Sphere Ltd</p>
            </aside>
        </footer>
    );
};

export default Footer;