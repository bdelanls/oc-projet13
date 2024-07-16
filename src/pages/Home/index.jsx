import featuresData from '../../data/featuresData'
import Feature from '../../components/Feature'
import './style.scss'

/**
 * HomePage component
 * Displays the homepage with promotional content and features
 * 
 * @returns {JSX.Element} The rendered homepage component
 */
function HomePage() {


    return (
        <>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featuresData.map((feature, index) => (
                    <Feature
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </section>
        </>
    )
}

export default HomePage