import { PortableText } from 'next-sanity'
import { cn } from '@/lib/utils'

import Image from './Image'
import Admonition from './Admonition'
import AnchoredHeading from './AnchoredHeading'

export default function Content({
	value,
	className,
	children,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { value: any } & React.ComponentProps<'div'>) {
	return (
		<div
			className={cn(
				'richtext mx-auto w-full space-y-6 [&>:first-child]:!mt-0',
				className,
			)}
		>
			<PortableText
				value={value}
				components={{
					block: {
						h2: (node) => <AnchoredHeading as="h2" {...node} />,
						h3: (node) => <AnchoredHeading as="h3" {...node} />,
						h4: (node) => <AnchoredHeading as="h4" {...node} />,
						h5: (node) => <AnchoredHeading as="h5" {...node} />,
						h6: (node) => <AnchoredHeading as="h6" {...node} />,
					},
					types: {
						image: Image,
						admonition: Admonition,
					},
				}}
			/>

			{children}
		</div>
	)
}
