import {Card, CardContent} from "@/components/ui/card";

export default function TermsOfServicePage(){
    return (
        <>
            <div className={`p-6 `}>
                <h1 className={`text-4xl font-bold mb-4`}> Terms of Service </h1>
                <Card>
                    <CardContent>
                        <p className={`mb-4`}>
                            Welcome to our Terms of Service page. By using our services,
                            you agree to comply with the following terms and conditions.
                        </p>
                        <h2 className={`text-2xl font-semibold mb-2`}>1. Acceptance of Terms</h2>
                        <p className={`mb-4`}>
                            By accessing or using our services, you agree to be bound by these terms.
                            If you do not agree with any part of these terms, you must not use our services.
                        </p>
                        <h2 className={`text-2xl font-semibold mb-2`}>2. File Uploads</h2>
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                            <li>
                                The user is solely responsible for the content of the files they upload.
                                CloudNRG does not monitor or control the content of these files.
                            </li>
                            <li>
                                The user guarantees that they have the necessary rights to upload the files
                                and that these files do not violate any laws or third-party rights.
                            </li>
                            <li>
                                CloudNRG reserves the right to remove any file that violates these terms
                                or applicable laws without prior notice.
                            </li>
                            <li>
                                The user agrees to indemnify CloudNRG against any claims arising from the
                                uploaded files.
                            </li>
                        </ul>

                            <h2 className={`text-2xl font-semibold mb-2`}>3. User Responsibilities</h2>
                            <p className={`mb-4`}>
                                CloudNRG's services are available to any adult individual with legal capacity.
                                The user guarantees that the information they provide is true, accurate, current,
                                and complete and undertakes to update it to maintain its accuracy. If any of the
                                information provided is false, inaccurate, expired, or incomplete, we reserve the
                                right to suspend or close the user's account and cancel this agreement without the
                                potential prejudice being able to be repaired. The user is responsible for maintaining
                                the confidentiality of their identifiers and is responsible for any activity on their
                                account.
                                If the user notices any activity indicating that their account is being used in an
                                unauthorized
                                manner or that their data is being used without their permission, they should
                                immediately contact us.
                                CloudNRG, as a data controller, implements automated data processing for managing its
                                website and
                                providing the service. The data collected is necessary for this processing and is
                                intended for
                                the services provided by CloudNRG and, if applicable, by its subcontractors and
                                providers.
                                Any person using CloudNRG's services can consult the page relating to the use of
                                personal data.
                            </p>

                    </CardContent>
                </Card>
            </div>
        </>
    );
}