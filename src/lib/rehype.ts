import { rehype } from 'rehype';
import rehypeShiki from '@shikijs/rehype';
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets';

export async function processContent(content: string): Promise<string> {
	const pipeline = rehype().use(rehypeShiki, {
		theme: 'synthwave-84',
		transformers: [transformerColorizedBrackets()]
	});

	return String(await pipeline.process(content));
}
