const emailSender = require('./../services/external/emailSender');
const repository = require('./../services/repositories/organization');

const EMAIL_SUBJECT = 'Your organization has been created successfully :)';
const EMAIL_CONTENT = 'Thanks for joinning us, enjoy your journey! :)';

const createOrganization = async (organization) => {
  // validaciones de negocio necesarias
  if (organization.owner.hasMoustache)
    throw new Exception('No se puede crear organizaciones de dueños que tengan bigote');

  const createdOrganization = await repository.persist(organization);
  try {
    await emailSender.sendEmailTo(EMAIL_SUBJECT, organization.email, EMAIL_CONTENT);
  } catch (e) {
    await repository.delete(createdOrganization.id);
    throw new Exception('Fallo el mail');
  }

  return createdOrganization;
};

const getAllOrganizations = async () => {
  const organizations = repository.getAll();
  return organizations;
}

const getOrganizationById = async (organizationId) => {
  const organization = repository.get(organizationId);
  return organization;
}