const TERMS = ['Fall', 'Winter', 'Spring'] as const;

interface TermSelectorProps {
  selectedTerm: string;
  onTermChange: (term: string) => void;
}

export const TermSelector = ({ selectedTerm, onTermChange }: TermSelectorProps) => (
  <div className="flex gap-2 mb-6 justify-center">
    {TERMS.map((term) => (
      <button
        key={term}
        onClick={() => onTermChange(term)}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          selectedTerm === term
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
        }`}
        aria-pressed={selectedTerm === term}
      >
        {term}
      </button>
    ))}
  </div>
);
