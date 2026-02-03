import React from 'react';
import CoverSlide from './CoverSlide';
import IntroSlide from './IntroSlide';
import HighlightSlide from './HighlightSlide';
import InfographicSlide from './InfographicSlide';
import ListSlide from './ListSlide';
import ChartSlide from './ChartSlide';
import BigNumberSlide from './BigNumberSlide';
import ComparisonSlide from './ComparisonSlide';
import QuoteSlide from './QuoteSlide';
import TestimonialSlide from './TestimonialSlide';
import SummarySlide from './SummarySlide';
import CTASlide from './CTASlide';
import StatsGridSlide from './StatsGridSlide';
import ProcessFlowSlide from './ProcessFlowSlide';
import TimelineSlide from './TimelineSlide';
import ChartRadialSlide from './ChartRadialSlide';

const SlideRenderer = ({ slide, index, colors, palette, userProfileImage, userImages, headingClass, headingWeight, postTitle, postCaption, socialHandle }) => {
    const props = { slide, index, colors, palette, userProfileImage, userImages, headingClass, headingWeight, postTitle, postCaption, socialHandle };

    switch (slide.type) {
        case 'cover':
            return <CoverSlide {...props} />;
        case 'intro':
            return <IntroSlide {...props} />;
        case 'highlight':
            return <HighlightSlide {...props} />;
        case 'infographic':
            return <InfographicSlide {...props} />;
        case 'list':
        case 'list-icons':
            return <ListSlide {...props} />;
        case 'process-flow':
            return <ProcessFlowSlide {...props} />;
        case 'timeline':
            return <TimelineSlide {...props} />;
        case 'stats-grid':
            return <StatsGridSlide {...props} />;
        case 'chart':
            return <ChartSlide {...props} />;
        case 'chart-radial':
            return <ChartRadialSlide {...props} />;
        case 'big-number':
            return <BigNumberSlide {...props} />;
        case 'comparison':
            return <ComparisonSlide {...props} />;
        case 'quote':
            return <QuoteSlide {...props} />;
        case 'testimonial':
            return <TestimonialSlide {...props} />;
        case 'summary':
            return <SummarySlide {...props} />;
        case 'cta':
            return <CTASlide {...props} />;
        default:
            return null;
    }
};

export default SlideRenderer;
