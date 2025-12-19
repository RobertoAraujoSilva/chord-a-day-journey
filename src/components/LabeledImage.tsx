import { useTranslation } from '@/i18n/context';
import type { TranslationKey } from '@/i18n/types';

/**
 * Interface for image label positioning and translation
 */
export interface ImageLabel {
  /** i18n translation key (e.g., 'lessons.intro.anatomy_labels.body') */
  key: TranslationKey;
  /** CSS absolute positioning for the label */
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  /** Optional custom styling classes */
  className?: string;
}

/**
 * Props for the LabeledImage component
 */
export interface LabeledImageProps {
  /** Image source path */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Array of labels to overlay on the image */
  labels: ImageLabel[];
  /** Optional container class name */
  containerClassName?: string;
  /** Optional image class name */
  imageClassName?: string;
}

/**
 * LabeledImage Component
 * 
 * Displays an image with dynamic, translatable labels overlaid using CSS positioning.
 * This allows for:
 * - Language-independent base images (no baked-in text)
 * - Dynamic label updates when language changes
 * - Precise positioning control via CSS
 * - Easy correction of label text without regenerating images
 * 
 * @example
 * ```tsx
 * <LabeledImage 
 *   src={guitarAnatomyBase}
 *   alt={t('lessons.intro.anatomy_title')}
 *   labels={[
 *     { key: 'lessons.intro.anatomy_labels.body', position: { top: '60%', right: '5%' } },
 *     { key: 'lessons.intro.anatomy_labels.neck', position: { top: '30%', left: '40%' } },
 *   ]}
 * />
 * ```
 */
export const LabeledImage = ({ 
  src, 
  alt, 
  labels, 
  containerClassName = '',
  imageClassName = 'w-full rounded-lg'
}: LabeledImageProps) => {
  const { t } = useTranslation();
  
  return (
    <div className={`relative ${containerClassName}`}>
      {/* Base image without text */}
      <img 
        src={src} 
        alt={alt} 
        className={imageClassName}
      />
      
      {/* Dynamic translatable labels */}
      {labels.map((label, idx) => (
        <span
          key={idx}
          className={`
            absolute
            bg-orange-500/90
            text-white
            px-2 py-0.5
            2xl:px-2.5 2xl:py-1
            3xl:px-3 3xl:py-1
            rounded-full
            text-[10px] 2xl:text-xs 3xl:text-sm
            font-bold
            shadow-lg
            border-2 border-white
            hover:bg-orange-600
            hover:scale-110
            transition-all
            pointer-events-none
            whitespace-nowrap
            ${label.className || ''}
          `}
          style={label.position}
        >
          {t(label.key)}
        </span>
      ))}
    </div>
  );
};

