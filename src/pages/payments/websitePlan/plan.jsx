import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./plan.css";

const plans = [
    {
        name: "Free Plan",
        price: 0,
        oldPrice: 5,
        save: "100% OFF",
        desc: "Get started for free. Perfect for individuals and photo publication.",
        features: [
            "1 website",
            "Basic support",
            "Community access",
            "Free SSL",
            "Limited analytics",
        ],
        button: "Choose Free Plan",
        badge: "Free Forever",
        popular: false,
    },
    {
        name: "Pro Upgrade",
        price: 10,
        oldPrice: 33.33,
        save: "SAVE 70%",
        desc: "Best for growing businesses. Unlock advanced features and support.",
        features: [
            "10 websites",
            "Photos",
            "Room and client management",
            "Contact support",
            "More analytics",
            "free SSL",
            "Daily backups",
            "Custom domains",
        ],
        button: "Choose Pro",
        badge: "Most Popular",
        popular: true,
    },
    {
        name: "Business Ventures",
        price: 50,
        oldPrice: 125,
        save: "SAVE 60%",
        desc: "For large teams and enterprises. Maximum power and flexibility.",
        features: [
            "Unlimited websites",
            "Photos and videos",
            "Room and client management",
            "Payment management",
            "Dedicated support",
            "Full analytics suite",
            "Free SSL",
            "Hourly backups",
            "Custom integrations",
            "White-labeling",
        ],
        button: "Choose Business",
        badge: "+ months free",
        popular: false,
    },
];


const PlanCard = ({ plan }) => (
    <div className={`plan-card${plan.popular ? " most-popular" : ""}`}>
        <div className="plan-badge">{plan.badge}</div>
        <div className="plan-name">{plan.name}</div>
        <div className="plan-price">
            {plan.price === 0 ? (
                <>
                    <span style={{ color: "var(--blue)", fontWeight: 700 }}>Free</span>
                </>
            ) : (
                <>
                    <span className="plan-old-price">${plan.oldPrice}/mo</span>
                    ${plan.price}/mo
                </>
            )}
        </div>
        <div className="plan-save">{plan.save}</div>
        <div className="plan-desc">{plan.desc}</div>
        <ul className="plan-features">
            {plan.features.map((feature, idx) => (
                <li key={idx}>
                    <FontAwesomeIcon icon={['fas','fa-check']} className="check" />
                    {feature}
                </li>
            ))}
        </ul>
        <div className="plan-action">
            <button className="btn">{plan.button}</button>
        </div>
    </div>
);

const Plan = () => (
    <>
        <nav className="editor-navbar">
            <div className="navbar-left">
                <span className="navbar-title">FreeHotel</span>
                <Link to="/editor/default" className="navbar-back">&gt; Back</Link>
            </div>
        </nav>
        <section className="plan-section">
            <h1 className="plan-title">Pick your perfect plan</h1>
            <div className="plan-subtitle">
                Choose the plan that fits your needs and launch online in minutes.
            </div>
            <div className="plan-cards">
                {plans.map((plan, idx) => (
                    <PlanCard plan={plan} key={plan.name} />
                ))}
            </div>
        </section>
    </>
);

export default Plan;
