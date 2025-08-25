const Footer = () => {
    return (
        <footer className="bg-soft-golden text-white py-8 px-6 md:px-20">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-2">Contact Us....</h3>
                    <p>Email: info@ngo.org</p>
                    <p>Phone: +91 98765 43210</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="#about" className="text-dark">About Us</a></li>
                        <li><a href="#services" className="text-dark">Services</a></li>
                        <li><a href="#resources" className="text-dark">Resources</a></li>
                        <li><a href="#contact" className="text-dark">Contact</a></li>
                    </ul>
                </div>
            </div>
            <p className="mt-6 text-center text-sm">© 333 Prankiran NGO. All rights reserved.</p>
        </footer>
    );
};

export default Footer;