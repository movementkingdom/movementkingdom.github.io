import * as React from 'react';
import Linkify from 'react-linkify';

import { ChatBubbleLeftEllipsisIcon, TagIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import imageDom from '../images/avatar-dom.png';

export type MessageType = {
  id: number;
  date: Date;
  message: string;
};

type Props = {
  messages: Array<MessageType>;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const NewsList: React.FC<Props> = ({ messages }: Props) => {
  const activity = messages.map((e) => {
    return {
      id: e.id,
      type: "comment",
      person: { name: "Dom", href: "#" },
      imageUrl: imageDom,
      comment: e.message,
      date: new Date(e.date),
    };
  });

  return (
    <div className="m-4 mx-auto py-10 px-6 max-w-2xl w-lg">
      <ul role="list" className="-mb-8">
        {activity.map((activityItem, activityItemIdx) => (
          <li key={activityItem.id}>
            <div className="relative pb-8">
              {activityItemIdx !== activity.length - 1 ? (
                <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                {activityItem.type === "comment" ? (
                  <>
                    <div className="relative">
                      <img
                        className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white"
                        src={activityItem.imageUrl}
                        alt=""
                      />

                      <span className="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </a>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          am {activityItem.date.toLocaleDateString()} um {activityItem.date.toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="mt-2 text-sm display-linebreak text-gray-700">
                        <Linkify>
                          <p>{activityItem.comment}</p>
                        </Linkify>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === "assignment" ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                          <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-1.5">
                      <div className="text-sm text-gray-500">
                        <a href={activityItem.person.href} className="font-medium text-gray-900">
                          {activityItem.person.name}
                        </a>{" "}
                        assigned{" "}
                        <a href={activityItem.assigned.href} className="font-medium text-gray-900">
                          {activityItem.assigned.name}
                        </a>{" "}
                        <span className="whitespace-nowrap">{activityItem.date.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                ) : activityItem.type === "tags" ? (
                  <>
                    <div>
                      <div className="relative px-1">
                        <div className="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                          <TagIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 py-0">
                      <div className="text-sm leading-8 text-gray-500">
                        <span className="mr-0.5">
                          <a href={activityItem.person.href} className="font-medium text-gray-900">
                            {activityItem.person.name}
                          </a>{" "}
                          added tags
                        </span>{" "}
                        <span className="mr-0.5">
                          {activityItem.tags.map((tag) => (
                            <React.Fragment key={tag.name}>
                              <a
                                href={tag.href}
                                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                              >
                                <span className="absolute flex-shrink-0 flex items-center justify-center">
                                  <span
                                    className={classNames(tag.color, "h-1.5 w-1.5 rounded-full")}
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="ml-3.5 font-medium text-gray-900">{tag.name}</span>
                              </a>{" "}
                            </React.Fragment>
                          ))}
                        </span>
                        <span className="whitespace-nowrap">{activityItem.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
