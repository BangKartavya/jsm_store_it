import Card from '@/components/Card';
import Sort from '@/components/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import { convertFileSize, getFileTypesParams } from '@/lib/utils';
import { Models } from 'node-appwrite';
import React from 'react'

const Page = async ({ searchParams, params }: SearchParamProps) => {
    const type = (await params)?.type as string || "";
    const types = getFileTypesParams(type) as FileType[];
    const searchText = ((await searchParams)?.query) as string || '';
    const sort = ((await searchParams)?.sort) as string || '';

    const files = await getFiles({ types, sort, searchText });

    const filesSize = files.total > 0 ? files.documents.reduce((partialSum: number, a: Models.Document) => partialSum + a.size, 0) : 0;


    return (
        <div className="page-container">
            <section className="w-full">
                <h1 className="h1 capitalize">{type}</h1>
                <div className="total-size-section">
                    <p className="body-1">
                        Total: <span className="h5">{convertFileSize(filesSize)}</span>
                    </p>
                    <div className="sort-container">
                        <p className="body-1 hidden sm:block text-light-200">Sort by:</p>
                        <Sort />
                    </div>
                </div>
            </section>
            {files.total > 0 ? (
                <section className="file-list">
                    {files.documents.map((file: Models.Document) => (
                        <Card key={file.$id} file={file} />
                    ))}
                </section>
            ) : <p className="empty-list">No files Uploaded</p>
            }

        </div>
    )
}

export default Page;