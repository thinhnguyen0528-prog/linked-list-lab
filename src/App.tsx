/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LearningPathMap } from './components/LearningPathMap';
import { LabSection } from './components/LabSection';
import { TheorySection } from './components/TheorySection';
import { PracticeSection } from './components/PracticeSection';
import { QuizSection } from './components/QuizSection';
import { ComparisonSection } from './components/ComparisonSection';
import { Footer } from './components/Footer';
import { GuidedTourModal } from './components/GuidedTourModal';
import { ListType, LearningModule } from './types/linkedList';
import { INITIAL_LEARNING_MODULES } from './data/learningPathData';
import { setSoundEnabled, isSoundEnabled, playStepClick } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [labListType, setLabListType] = useState<ListType>('singly');
  const [modules, setModules] = useState<LearningModule[]>(INITIAL_LEARNING_MODULES);
  const [activeModuleId, setActiveModuleId] = useState<string>('mod-node');
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [soundActive, setSoundActive] = useState<boolean>(() => isSoundEnabled());

  const toggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
    if (next) playStepClick();
  };

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStartLearning = () => {
    scrollToSection('theory-section');
  };

  const handleEnterLab = (type?: ListType) => {
    if (type) setLabListType(type);
    scrollToSection('lab-section');
  };

  const handleSelectModule = (mod: LearningModule) => {
    setActiveModuleId(mod.id);
    // Mark as in-progress if not completed
    setModules(prev => prev.map(m => {
      if (m.id === mod.id && m.status === 'not_started') {
        return { ...m, status: 'in_progress' };
      }
      return m;
    }));
    scrollToSection(mod.targetSection);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#263238] flex flex-col font-sans selection:bg-[#2D6A4F]/20 selection:text-[#1E293B]">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'hero') scrollToSection('root');
          else if (tab === 'theory') scrollToSection('theory-section');
          else if (tab === 'lab') scrollToSection('lab-section');
          else if (tab === 'practice') scrollToSection('practice-section');
          else if (tab === 'quiz') scrollToSection('quiz-section');
          else if (tab === 'compare') scrollToSection('compare-section');
        }}
        onOpenGuidedTour={() => setIsTourOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Hero Section V2 with sequential animation and sound toggle */}
        <Hero
          onStartLearning={handleStartLearning}
          onEnterLab={handleEnterLab}
          onOpenGuidedTour={() => setIsTourOpen(true)}
          soundActive={soundActive}
          onToggleSound={toggleSound}
        />

        {/* 2. Bản đồ bài học (Learning Path & Progress Tracker) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
          <LearningPathMap
            modules={modules}
            activeModuleId={activeModuleId}
            onSelectModule={handleSelectModule}
          />
        </div>

        {/* 3. Interactive Lab Section (Core feature) */}
        <LabSection initialType={labListType} />

        {/* 4. Visual Theory Lessons */}
        <TheorySection onJumpToLab={() => scrollToSection('lab-section')} />

        {/* 5. "Tự mình làm" Practice & Challenge Section with Consequence Simulation */}
        <PracticeSection />

        {/* 6. Visual Interactive Quiz */}
        <QuizSection />

        {/* 7. Comparison Section */}
        <ComparisonSection />
      </main>

      {/* Guided Tour Modal */}
      <GuidedTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onJumpToPractice={() => scrollToSection('practice-section')}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
