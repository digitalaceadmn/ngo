import Link from "next/link";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <>
            <footer className="text-dark py-10 pb-4 px-6 md:px-20" style={{ background: "#00251F" }}>
                <Container>
                    <div className="grid md:grid-cols-3 gap-10">

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Contact Info</h3>
                            <p className="text-success mb-0">Email:</p>
                            <Link href="mailto:support@prankiran.org" className="text-white underline">support@prankiran.org</Link>

                            <p className="text-success mt-3 mb-0">Phone: </p>
                            <Link href={"tel:+919876543210"} className="text-white">+91 98765 43210</Link>

                            <p className="text-success mt-3 mb-0">Address: </p>
                            <Link href="https://maps.google.com/?q=New+Delhi,+India" target="_blank" className="text-white">PranKiran Ray of Vitality, New Delhi, India</Link>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-semibold mb-3 text-lg"> Quick Links</h3>
                            <ul className="space-y-2 p-0">
                                <li><Link href="/" className="text-white hover:underline">Home</Link></li>
                                <li><Link href="/about-us" className="text-white hover:underline">About Us</Link></li>
                                <li><Link href="/model" className="text-white hover:underline">Model</Link></li>
                                {/* <li><Link href="#learning" className="text-white hover:underline">Join Learning Hub</Link></li> */}
                                {/* <li><Link href="#resources" className="text-white hover:underline">Resources (PDFs & Infographics)</Link></li> */}
                                {/* <li><Link href="#caregiver" className="text-white hover:underline">Caregiver Support</Link></li> */}
                                <li><Link href="/contact-us" className="text-white hover:underline">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Live Hope Counter */}
                        {/* <div>
                    <h3 className="font-semibold mb-3 text-lg">Live Hope Counter</h3>
                    <div className="bg-white text-dark p-4 rounded-xl shadow-md text-center">
                        <p className="text-xl font-bold">Hope Shared Today</p>
                        <p className="text-2xl text-golden font-extrabold">1,254 Rays</p>
                        <a href="#hope-stories" className="mt-2 inline-block text-sm text-golden underline">
                            See Hope Stories →
                        </a>
                    </div>
                </div> */}
                        <div>
                            <h3 className="font-semibold mb-3 text-lg">Follow Us</h3>
                            <div className="flex flex-col space-y-3">
                                <div
                                    className="fb-page"
                                    data-href="https://www.facebook.com/profile.php?id=61579387072095"
                                    data-tabs="timeline"
                                    data-width="100%"
                                    data-height="250"
                                    data-small-header="true"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="false"
                                ></div>
                            </div>
                        </div>

                    </div>
                </Container>
            </footer>

            <div className="border-t border-golden" style={{ background: "#00251F" }}>
                <Container>
                    <div className="d-flex justify-between items-center p-3">
                        <p className="text-sm mt-2 text-white">© 2025 PranKiran NGO. All rights reserved.</p>

                        {/* Join Community Button */}
                        <a
                            href="https://nas.io/your-community-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="md:mt-0 bg-golden text-dark font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
                        >
                            Join Community
                        </a>
                    </div>
                </Container>
            </div>

        </>
    );
};

export default Footer;
