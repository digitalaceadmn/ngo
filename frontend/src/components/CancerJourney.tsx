import { FaLightbulb, FaStethoscope, FaHospital, FaHandsHelping } from "react-icons/fa";

const CancerJourney = () => {
    return (
        <section className="py-16 px-6 md:px-20 bg-dark text-center text-gold">
            <h2 className="text-4xl font-bold mb-6">The Cancer Journey</h2>
            <p className="mb-12 text-lg text-light">
                A compassionate look at the key phases of cancer care – <b>Awareness</b>, <b>Diagnosis</b>, <b>Treatment</b>, and <b>Support</b>.
            </p>

            <div className="grid md:grid-cols-4 gap-8">
                {/* Awareness */}
                <div className="p-8 bg-secondary rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaLightbulb className="text-gold text-5xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Awareness</h3>
                    <p className="text-light mt-2 text-sm">
                        Spreading knowledge about early detection and healthy lifestyle choices.
                    </p>
                </div>

                {/* Diagnosis */}
                <div className="p-8 bg-secondary rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaStethoscope className="text-gold text-5xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Diagnosis</h3>
                    <p className="text-light mt-2 text-sm">
                        Providing accurate screenings and timely medical consultations.
                    </p>
                </div>

                {/* Treatment */}
                <div className="p-8 bg-secondary rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaHospital className="text-gold text-5xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Treatment</h3>
                    <p className="text-light mt-2 text-sm">
                        Access to hospitals, doctors, and therapies to fight cancer effectively.
                    </p>
                </div>

                {/* Support */}
                <div className="p-8 bg-secondary rounded-2xl shadow-lg hover:scale-105 transition">
                    <FaHandsHelping className="text-gold text-5xl mb-4 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Support</h3>
                    <p className="text-light mt-2 text-sm">
                        Emotional care, financial aid, and community programs for patients & families.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CancerJourney;
