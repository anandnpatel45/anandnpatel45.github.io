import { Layers, Workflow } from 'lucide-react';

export default function ProjectIllustration({ variant }: { variant?: string }) {
  const isDeposition = variant === 'deposition';
  const Icon = isDeposition ? Layers : Workflow;
  const background = isDeposition ? 'from-sky-950 to-blue-700' : 'from-indigo-950 to-violet-700';

  return (
    <div aria-hidden="true" className={`grid h-full min-h-40 w-full place-items-center bg-gradient-to-br ${background}`}>
      <Icon className="h-24 w-24 text-white/90" strokeWidth={1.25} />
    </div>
  );
}
