import { FaUserMd, FaProcedures, FaHandsHelping, FaQuestionCircle } from "react-icons/fa";

const QuickHelpMenu = () => {
    return (
        <section className="quickhelp-section">
            <h2 className="quickhelp-title">Quick Help & Resources</h2>
            <ul className="quickhelp-list">
                <li>
                    <a href="#doctors" className="btn-gold">
                        <FaUserMd className="icon" /> Find Doctors
                    </a>
                </li>
                <li>
                    <a href="#treatment" className="btn-gold">
                        <FaProcedures className="icon" /> Treatment Options
                    </a>
                </li>
                <li>
                    <a href="#support" className="btn-gold">
                        <FaHandsHelping className="icon" /> Support Groups
                    </a>
                </li>
                <li>
                    <a href="#faq" className="btn-gold">
                        <FaQuestionCircle className="icon" /> FAQs
                    </a>
                </li>
            </ul>
        </section>
    );
};

export default QuickHelpMenu;
