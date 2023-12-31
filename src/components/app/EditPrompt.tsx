import { useParams } from 'react-router-dom';

import { websiteTitle } from '../../constants';
import { trpc } from '../trpc';
import { EditPromptControls } from './CreatePrompt';
import { Layout } from './Layout';

export function EditPrompt() {
	const { promptId } = useParams<{ promptId: string }>();
	const promptsQuery = trpc.prompts.getPrompt.useQuery(
		{
			promptId: promptId!,
		},
		{
			enabled: !!promptId,
			staleTime: 1000,
		}
	);
	const data = promptsQuery.data;
	return (
		<Layout
			title={`${websiteTitle} / ${data?.prompt.title ? data?.prompt.title + ' / ' : ''}Edit prompt`}
		>
			{data && (
				<EditPromptControls
					promptId={data.prompt.promptId}
					promptName={data.prompt.title}
					promptDescription={data.prompt.description}
					promptTags={data.prompt.tags}
					promptPrivacyLevel={data.prompt.privacyLevel}
					template={data.prompt.template}
				/>
			)}
			{promptsQuery.isLoading && <div>Loading...</div>}
			{promptsQuery.error && <div className="text-red-500">{promptsQuery.error.message}</div>}
		</Layout>
	);
}
