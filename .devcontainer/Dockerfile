ARG DEBIAN_VERSION=trixie-20251208-slim

FROM debian:${DEBIAN_VERSION}

ARG DEBIAN_FRONTEND=noninteractive

# Base tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    gh \
    openssh-client \
    sudo \
    locales \
    less \
    procps \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Node.js (required by the transient skills.sh installer)
ARG NODE_VERSION=22.23.2
ARG NODE_SHA256=b294a556e639d64338823920e5866c21c02741742d2e1529ee1a225c1ec9252a
ARG NODE_URL="https://nodejs.org/download/release/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz"

RUN curl -fsSL "${NODE_URL}" -o /tmp/node.tar.gz \
    && echo "${NODE_SHA256}  /tmp/node.tar.gz" | sha256sum -c - \
    && mkdir -p /opt/node \
    && tar -xzf /tmp/node.tar.gz -C /opt/node --strip-components=1 \
    && ln -s /opt/node/bin/node /usr/local/bin/node \
    && ln -s /opt/node/bin/npm /usr/local/bin/npm \
    && ln -s /opt/node/bin/npx /usr/local/bin/npx \
    && rm /tmp/node.tar.gz

ENV PATH="/opt/node/bin:${PATH}"

# Treehouse CLI
ARG TREEHOUSE_VERSION=2.3.0
ARG TREEHOUSE_SHA256=94fd2b2c20c35aac1ddc2941317890ad82c9916f5ccecbac4a50cda783eed10f
ARG TREEHOUSE_URL="https://github.com/kunchenguid/treehouse/releases/download/v${TREEHOUSE_VERSION}/treehouse-v${TREEHOUSE_VERSION}-linux-amd64.tar.gz"

RUN curl -fsSL "${TREEHOUSE_URL}" -o /tmp/treehouse.tar.gz \
    && echo "${TREEHOUSE_SHA256}  /tmp/treehouse.tar.gz" | sha256sum -c - \
    && tar -xzf /tmp/treehouse.tar.gz -C /usr/local/bin treehouse \
    && chmod 0755 /usr/local/bin/treehouse \
    && rm /tmp/treehouse.tar.gz

# Locale
RUN sed -i 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# Non-root user for VS Code
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME -s /bin/bash \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# Temurin JDK 21 from Adoptium tarball
ARG TEMURIN_VERSION=21.0.9
ARG TEMURIN_BUILD=10
ARG TEMURIN_URL="https://github.com/adoptium/temurin21-binaries/releases/download/jdk-${TEMURIN_VERSION}%2B${TEMURIN_BUILD}/OpenJDK21U-jdk_x64_linux_hotspot_${TEMURIN_VERSION}_${TEMURIN_BUILD}.tar.gz"

RUN mkdir -p /opt/temurin-21 \
    && curl -fsSL "${TEMURIN_URL}" -o /tmp/temurin.tar.gz \
    && tar -xzf /tmp/temurin.tar.gz -C /opt/temurin-21 --strip-components=1 \
    && rm /tmp/temurin.tar.gz

ENV JAVA_HOME=/opt/temurin-21
ENV PATH="${JAVA_HOME}/bin:${PATH}"

# Gradle from official distribution zip
ARG GRADLE_VERSION=9.2.1
ARG GRADLE_URL="https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip"

RUN mkdir -p /opt/gradle \
    && curl -fsSL "${GRADLE_URL}" -o /tmp/gradle.zip \
    && unzip -d /opt/gradle /tmp/gradle.zip \
    && rm /tmp/gradle.zip

ENV GRADLE_HOME=/opt/gradle/gradle-${GRADLE_VERSION}
ENV PATH="${GRADLE_HOME}/bin:${PATH}"

USER $USERNAME
WORKDIR /workspaces
