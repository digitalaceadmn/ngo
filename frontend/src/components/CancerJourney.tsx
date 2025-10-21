import { Col, Row } from "react-bootstrap";
import { FaLightbulb, FaStethoscope, FaHospital, FaHandsHelping } from "react-icons/fa";

const CancerJourney = () => {
    return (
        <section className="py-16 px-6 md:px-20 bg-soft-golden text-center text-gold">
            <Row>
                <Col md={6} className="mb-4">
                </Col>
                <Col md={6} className="mb-4">
                    <h2 className="text-4xl font-bold mb-6">80% of India’s Community Health Centres Struggle Without Specialists</h2>
                    <p className="mb-12 text-lg text-dark">
                        Community Health Centres (CHCs) form the backbone of India’s rural healthcare system, acting as referral units for Primary Health Centres (PHCs). Each CHC is mandated to have four key specialists – a surgeon, physician, gynecologist, and pediatrician. However, nearly 80% of CHCs lack these essential specialists, leaving millions of rural families deprived of critical medical services.

                        The shortage is most acute in underserved regions. Rural patients often travel long distances to district hospitals, causing delays in treatment and increased out-of-pocket expenses. Pregnant women, children, and chronic patients are especially vulnerable.

                        Factors such as poor infrastructure, lack of incentives, and challenging living conditions deter doctors from working in rural areas. Bridging this gap requires incentives, telemedicine, public-private partnerships, and NGO involvement to deliver timely and affordable care.
                    </p>
                </Col>
            </Row>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Awareness */}
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaLightbulb className="text-gold text-5xl mb-4 mx-auto" style={{ color: '#FFD700' }} />
                    <p className="text-dark mt-2 display-6">
                        1250+
                    </p>
                    <h3 className="text-xl font-semibold text-dark">Monthly Consults</h3>
                </div>

                {/* Diagnosis */}
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaStethoscope className="text-gold text-5xl mb-4 mx-auto" style={{ color: '#FFD700' }} />
                    <p className="text-dark mt-2 display-6">
                        3400+
                    </p>
                    <h3 className="text-xl font-semibold text-dark">Child Patients</h3>
                </div>

                {/* Treatment */}
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaHospital className="text-gold text-5xl mb-4 mx-auto" style={{ color: '#FFD700' }} />
                    <p className="text-dark mt-2 display-6">
                        78000 km
                    </p>
                    <h3 className="text-xl font-semibold text-dark">Travel for Care</h3>
                </div>

                {/* Support */}
                <div className="p-8 bg-white rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaHandsHelping className="text-gold text-5xl mb-4 mx-auto" style={{ color: '#FFD700' }} />
                    <p className="text-dark mt-2 display-6">
                        45000+
                    </p>
                    <h3 className="text-xl font-semibold text-dark">Beds Shortage</h3>
                </div>
            </div>
        </section>
    );
};

export default CancerJourney;
