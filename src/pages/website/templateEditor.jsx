import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import editor1 from '../../assets/images/editor1.jpg';
import editor2 from '../../assets/images/editor2.png';
import editor3 from '../../assets/images/editor3.jpg';
import './templateEditor.css';

const templates = {
    'luxury-hotel': {
        name: 'Luxury Hotel',
        image: editor1,
        default: {
            title: 'Your Paradise Found',
            subtitle: 'Discover a World of Serenity, Your Escape From the Everyday',
            button: 'Reserve Now',
            logo: '',
            slogan: '',
            bgColor: '#1a1a1a',
            textColor: '#fff',
            buttonColor: '#ffd000',
            buttonTextColor: '#0b3e66',
        }
    },
    'boutique-hotel': {
        name: 'Boutique Hotel',
        image: editor2,
        default: {
            title: 'Warmth in Every Cup',
            subtitle: 'Discover your new favorite coffee and pastry pairing at our cafe.',
            button: 'View Menu',
            logo: '',
            slogan: '',
            bgColor: '#3a2c1a',
            textColor: '#fff',
            buttonColor: '#ffd000',
            buttonTextColor: '#3a2c1a',
        }
    },
    'business-hotel': {
        name: 'Business Hotel',
        image: editor3,
        default: {
            title: 'Coming Soon',
            subtitle: 'The Future of Corporate Solutions',
            button: 'Get Notified',
            logo: '',
            slogan: '',
            bgColor: '#1a2c1a',
            textColor: '#fff',
            buttonColor: '#ffd000',
            buttonTextColor: '#1a2c1a',
        }
    }
};

export default function TemplateEditor() {
    const { templateId } = useParams();
    const navigate = useNavigate();
    const template = templates[templateId];

    const [fields, setFields] = useState(template ? template.default : {});
    const [bgType, setBgType] = useState('color'); // 'color' or 'image'
    const [bgImage, setBgImage] = useState(template ? template.image : '');
    const [bgBrightness, setBgBrightness] = useState(1);
    const [buttonHoverBg, setButtonHoverBg] = useState('#ffe066');
    const [buttonHoverText, setButtonHoverText] = useState('#0b3e66');
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (!template) navigate('/website');
    }, [template, navigate]);

    if (!template) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleBgTypeChange = (e) => {
        setBgType(e.target.value);
    };

    const handleBgImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setBgImage(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBgBrightnessChange = (e) => {
        setBgBrightness(Number(e.target.value));
    };

    return (
        <div className="template-editor">
            <aside className="editor-sidebar">
                <h2>Edit Content</h2>
                <div className="editor-section">
                    <label>Title</label>
                    <input name="title" value={fields.title} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Subtitle</label>
                    <input name="subtitle" value={fields.subtitle} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Button Text</label>
                    <input name="button" value={fields.button} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Logo Text</label>
                    <input name="logo" value={fields.logo} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Slogan</label>
                    <input name="slogan" value={fields.slogan} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Background Type</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <label>
                            <input type="radio" name="bgType" value="color" checked={bgType === 'color'} onChange={handleBgTypeChange} />
                            Color
                        </label>
                        <label>
                            <input type="radio" name="bgType" value="image" checked={bgType === 'image'} onChange={handleBgTypeChange} />
                            Image
                        </label>
                    </div>
                </div>
                {bgType === 'color' && (
                    <>
                        <div className="editor-section">
                            <label>Background Color</label>
                            <input name="bgColor" type="color" value={fields.bgColor} onChange={handleChange} />
                        </div>
                    </>
                )}
                {bgType === 'image' && (
                    <>
                        <div className="editor-section">
                            <label>Background Image</label>
                            <input type="file" accept="image/*" onChange={handleBgImageChange} />
                            <div style={{ marginTop: '8px' }}>
                                <img src={bgImage} alt="Background Preview" style={{ width: '100%', maxHeight: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                            </div>
                        </div>
                        <div className="editor-section">
                            <label>Brightness</label>
                            <input
                                type="range"
                                min="0.3"
                                max="1.5"
                                step="0.01"
                                value={bgBrightness}
                                onChange={handleBgBrightnessChange}
                            />
                            <span style={{ fontSize: '0.95rem', color: '#888' }}> {bgBrightness}</span>
                        </div>
                    </>
                )}
                <div className="editor-section">
                    <label>Text Color</label>
                    <input name="textColor" type="color" value={fields.textColor} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Button Color</label>
                    <input name="buttonColor" type="color" value={fields.buttonColor} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Button Text Color</label>
                    <input name="buttonTextColor" type="color" value={fields.buttonTextColor} onChange={handleChange} />
                </div>
                <div className="editor-section">
                    <label>Button Hover Color</label>
                    <input type="color" value={buttonHoverBg} onChange={e => setButtonHoverBg(e.target.value)} />
                </div>
                <div className="editor-section">
                    <label>Button Hover Text Color</label>
                    <input type="color" value={buttonHoverText} onChange={e => setButtonHoverText(e.target.value)} />
                </div>
                <div className="editor-actions">
                    <button className="btn preview" type="button" onClick={() => setShowPreview(true)}>
                        Preview Website
                    </button>
                    <button className="btn save">Save Progress</button>
                    <button className="btn publish">Publish</button>
                </div>
            </aside>
            <main
                className="editor-preview"
                style={bgType === 'color' ? { background: fields.bgColor } : { position: 'relative', background: 'transparent' }}
            >
                {bgType === 'image' && (
                    <div
                        className="editor-bg-image"
                        style={{
                            backgroundImage: `url(${bgImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed',
                            filter: `brightness(${bgBrightness})`,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 0,
                        }}
                    />
                )}
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                    <div className="editor-logo" style={{ color: fields.textColor }}>
                        <div className="logo-text">{fields.logo || 'LOGO TEXT HERE'}</div>
                        <div className="logo-slogan">{fields.slogan || 'SLOGAN HERE'}</div>
                    </div>
                    <div className="editor-content">
                        <h1 style={{ color: fields.textColor }}>{fields.title}</h1>
                        <p style={{ color: fields.textColor }}>{fields.subtitle}</p>
                        <button
                            className="editor-btn"
                            style={{
                                background: isBtnHovered ? buttonHoverBg : fields.buttonColor,
                                color: isBtnHovered ? buttonHoverText : fields.buttonTextColor
                            }}
                            onMouseEnter={() => setIsBtnHovered(true)}
                            onMouseLeave={() => setIsBtnHovered(false)}
                        >
                            {fields.button}
                        </button>
                    </div>
                </div>
            </main>
            {showPreview && (
                <div className="editor-preview-modal">
                    <div
                        className="editor-preview-full"
                        style={bgType === 'color' ? { background: fields.bgColor } : { position: 'relative', background: 'transparent' }}
                    >
                        {bgType === 'image' && (
                            <div
                                className="editor-bg-image"
                                style={{
                                    backgroundImage: `url(${bgImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundAttachment: 'fixed',
                                    filter: `brightness(${bgBrightness})`,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    zIndex: 0,
                                }}
                            />
                        )}
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div className="editor-logo" style={{ color: fields.textColor }}>
                                <div className="logo-text">{fields.logo || 'LOGO TEXT HERE'}</div>
                                <div className="logo-slogan">{fields.slogan || 'SLOGAN HERE'}</div>
                            </div>
                            <div className="editor-content">
                                <h1 style={{ color: fields.textColor }}>{fields.title}</h1>
                                <p style={{ color: fields.textColor }}>{fields.subtitle}</p>
                                <button
                                    className="editor-btn"
                                    style={{
                                        background: fields.buttonColor,
                                        color: fields.buttonTextColor
                                    }}
                                >
                                    {fields.button}
                                </button>
                            </div>
                            <button className="btn" style={{ marginTop: 32 }} onClick={() => setShowPreview(false)}>Close Preview</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 