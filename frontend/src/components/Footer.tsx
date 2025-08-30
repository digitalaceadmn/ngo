const Footer = () => {
    return (
        <footer className=" text-dark py-10 px-6 md:px-20" style={{background:"#0a1f44"}}>
            <div className="grid md:grid-cols-3 gap-10">

                {/* Contact Info */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Contact Info</h3>
                    <p>Email: <a href="mailto:support@prankiran.org" className="text-white underline">support@prankiran.org</a></p>
                    <p>Phone: <span className="text-white">+91 98765 43210</span></p>
                    <p>Address: <span className="text-white">PranKiran – Ray of Vitality, New Delhi, India</span></p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg"> Quick Links</h3>
                    <ul className="space-y-2 p-0">
                        <li><a href="#about" className="text-white hover:underline">About Us</a></li>
                        <li><a href="#stories" className="text-white hover:underline">Patient Stories</a></li>
                        <li><a href="#learning" className="text-white hover:underline">Join Learning Hub</a></li>
                        <li><a href="#resources" className="text-white hover:underline">Resources (PDFs & Infographics)</a></li>
                        <li><a href="#caregiver" className="text-white hover:underline">Caregiver Support</a></li>
                        <li><a href="#contact" className="text-white hover:underline">Contact Us</a></li>
                    </ul>
                </div>

                {/* Live Hope Counter */}
                <div>
                    <h3 className="font-semibold mb-3 text-lg">Live Hope Counter</h3>
                    <div className="bg-white text-dark p-4 rounded-xl shadow-md text-center">
                        <p className="text-xl font-bold">Hope Shared Today</p>
                        <p className="text-2xl text-golden font-extrabold">1,254 Rays</p>
                        <a href="#hope-stories" className="mt-2 inline-block text-sm text-golden underline">
                            See Hope Stories →
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-golden pt-6">
                <p className="text-sm mt-2 ">© 2025 PranKiran NGO. All rights reserved.</p>

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
        </footer>
    );
};

export default Footer;
