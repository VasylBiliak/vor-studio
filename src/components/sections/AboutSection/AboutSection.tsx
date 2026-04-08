"use client";

import React from 'react';

const AboutSection = () => {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
            Про VOR STUDIO
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Концептуальний бренд одягу, що поєднує українську спадщину з сучасними світовими трендами
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-16 rounded-lg overflow-hidden shadow-xl border border-[var(--color-border)]">
          <img 
            src="https://placehold.co/800x400?text=VOR+STUDIO+About" 
            alt="VOR Studio" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Наша Історія</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">Наша Філософія</h2>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--color-bg-secondary)] rounded-full mx-auto mb-4 flex items-center justify-center border border-[var(--color-border)]">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Дизайн</h3>
            <p className="text-[var(--color-text-secondary)]">
              Унікальний дизайн, що поєднує традиції та інновації
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--color-bg-secondary)] rounded-full mx-auto mb-4 flex items-center justify-center border border-[var(--color-border)]">
              <span className="text-2xl">🇺🇦</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Якість</h3>
            <p className="text-[var(--color-text-secondary)]">
              Вироблено в Україні з найкращих матеріалів
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-[var(--color-bg-secondary)] rounded-full mx-auto mb-4 flex items-center justify-center border border-[var(--color-border)]">
              <span className="text-2xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">Екологічність</h3>
            <p className="text-[var(--color-text-secondary)]">
              Стійке виробництво та відповідальне споживання
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--color-text-primary)]">Наша Команда</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <img 
                  src={`https://placehold.co/300x300?text=Team+Member+${i}`} 
                  alt={`Team Member ${i}`} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-2 border-[var(--color-border)]"
                />
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">Ім'я Прізвище</h3>
                <p className="text-[var(--color-text-secondary)]">Позиція в компанії</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[var(--color-bg-secondary)] rounded-lg p-8 text-center border border-[var(--color-border)]">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
            Приєднуйтесь до нашої спільноти
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] px-6 py-3 rounded-lg hover:bg-[var(--color-text-tertiary)] transition-colors">
              Переглянути Колекцію
            </button>
            <button className="border border-[var(--color-border)] px-6 py-3 rounded-lg hover:bg-[var(--color-bg-primary)] hover:border-[var(--color-text-primary)] transition-colors">
              Зв'язатися з нами
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutSection;
